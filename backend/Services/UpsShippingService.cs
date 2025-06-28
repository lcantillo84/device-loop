using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using backend.Models;
using Microsoft.Extensions.Options;

namespace backend.Services
{
    public class UpsShippingService
    {
        private readonly HttpClient _http;
        private readonly UpsSettings _settings;
        private string? _token;
        private DateTimeOffset _expiry;

        public UpsShippingService(HttpClient http, IOptions<UpsSettings> opts)
        {
            _http = http;
            _settings = opts.Value;
        }
        public async Task<string> GetAccessTokenOnlyAsync()
        {
            var clientId = _settings.ClientId;
            var clientSecret = _settings.ClientSecret;
            var authHeader = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{clientId}:{clientSecret}"));

            var request = new HttpRequestMessage(HttpMethod.Post, "https://onlinetools.ups.com/security/v1/oauth/token");
            request.Headers.Authorization = new AuthenticationHeaderValue("Basic", authHeader);
            request.Content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("grant_type", "client_credentials")
            });

            var response = await _http.SendAsync(request);
            var content = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
                throw new Exception($"Token request failed: {response.StatusCode} - {content}");

            using var doc = JsonDocument.Parse(content);
            return doc.RootElement.GetProperty("access_token").GetString()!;
        }
        
    public async Task<string> CreateLabelWithTokenAsync(ShipmentRequestDto dto, string token)
{
    var url = "https://onlinetools.ups.com/api/shipments/v1/ship"; // production URL

    var request = new HttpRequestMessage(HttpMethod.Post, url);
    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
    request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

    var payload = new
    {
        ShipmentRequest = new
        {
            Shipment = new
            {
                Shipper = new
                {
                    Name = "Device Loop",
                    ShipperNumber = _settings.AccountNumber,
                    Address = new
                    {
                        AddressLine = new[] { "123 Main St" },
                        City = "Orlando",
                        StateProvinceCode = "FL",
                        PostalCode = "32801",
                        CountryCode = "US"
                    }
                },
                ShipTo = new
                {
                    Name = dto.RecipientName,
                    Address = new
                    {
                        AddressLine = new[] { dto.AddressLine },
                        City = dto.City,
                        StateProvinceCode = dto.State,
                        PostalCode = dto.Zip,
                        CountryCode = "US"
                    }
                },
                Service = new
                {
                    Code = "003",
                    Description = "Ground"
                },
                Package = new[]
                {
                    new
                    {
                        Packaging = new
                        {
                            Code = "02",
                            Description = "Package"
                        },
                        PackageWeight = new
                        {
                            UnitOfMeasurement = new
                            {
                                Code = "LBS"
                            },
                            Weight = dto.Weight.ToString("F1")
                        }
                    }
                },
                PaymentInformation = new
                {
                    ShipmentCharge = new
                    {
                        Type = "01", // 01 = Transportation
                        BillShipper = new
                        {
                            AccountNumber = _settings.AccountNumber
                        }
                    }
                }
            },
            LabelSpecification = new
            {
                LabelImageFormat = new
                {
                    Code = "GIF"
                },
                HTTPUserAgent = "DeviceLoopApp/1.0"
            }
        }
    };

    var json = JsonSerializer.Serialize(payload);
    request.Content = new StringContent(json, Encoding.UTF8, "application/json");

    var response = await _http.SendAsync(request);
    var result = await response.Content.ReadAsStringAsync();

    if (!response.IsSuccessStatusCode)
        throw new Exception($"UPS label failed: {response.StatusCode}\n{result}");

    return result;
}


        private async Task<string> GetAccessTokenAsync()
        {
            if (_token != null && DateTimeOffset.UtcNow < _expiry)
                return _token;

            var clientId = _settings.ClientId;
            var clientSecret = _settings.ClientSecret;
            var authHeader = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{clientId}:{clientSecret}"));

            var request = new HttpRequestMessage(HttpMethod.Post, "https://onlinetools.ups.com/security/v1/oauth/token");
            request.Headers.Authorization = new AuthenticationHeaderValue("Basic", authHeader);
            request.Content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("grant_type", "client_credentials")
            });

            var response = await _http.SendAsync(request);
            var content = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Token failed: {response.StatusCode} - {content}");
            }

            using var doc = JsonDocument.Parse(content);
            _token = doc.RootElement.GetProperty("access_token").GetString()!;
    
            var expiresInRaw = doc.RootElement.GetProperty("expires_in");
            int ttl = expiresInRaw.ValueKind == JsonValueKind.String
                ? int.Parse(expiresInRaw.GetString()!)
                : expiresInRaw.GetInt32();
        
            _expiry = DateTimeOffset.UtcNow.AddSeconds(ttl - 60);

            return _token;
        }

        public async Task<string> CreateLabelAsync(ShipmentRequestDto dto)
        {
            var token = await GetAccessTokenAsync();

            var payload = new {
                ShipmentRequest = new {
                    Shipment = new {
                        Shipper = new {
                            Name = "DeviceLoop",
                            ShipperNumber = _settings.AccountNumber,
                            Address = new {
                                AddressLine = new[] { dto.AddressLine },
                                City = dto.City,
                                StateProvinceCode = dto.State,
                                PostalCode = dto.Zip,
                                CountryCode = "US"
                            }
                        },
                        ShipTo = new {
                            Name = dto.RecipientName,
                            Address = new {
                                AddressLine = new[] { dto.AddressLine },
                                City = dto.City,
                                StateProvinceCode = dto.State,
                                PostalCode = dto.Zip,
                                CountryCode = "US"
                            }
                        },
                        Package = new[] {
                            new {
                                PackagingType = new { Code = "02" },
                                PackageWeight = new {
                                    UnitOfMeasurement = new { Code = "LBS" },
                                    Weight = dto.Weight.ToString()
                                }
                            }
                        },
                        Service = new { Code = "03" }
                    },
                    LabelSpecification = new {
                        LabelFormatType = "GIF",
                        LabelStockSize = "4X6",
                        LabelPrintMethod = new { Code = "GIF" }
                    }
                }
            };

            var request = new HttpRequestMessage(HttpMethod.Post,
                "https://onlinetools.ups.com/api/shipments/v1/ship")
            {
                Content = new StringContent(
                    JsonSerializer.Serialize(payload),
                    Encoding.UTF8,
                    "application/json")
            };
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var resp = await _http.SendAsync(request);
            resp.EnsureSuccessStatusCode();

            var json = await resp.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(json);
            return doc.RootElement
                      .GetProperty("ShipmentResponse")
                      .GetProperty("LabelResults")
                      .GetProperty("LabelImage")
                      .GetProperty("GraphicImage")
                      .GetString()!;
        }
    }
}
