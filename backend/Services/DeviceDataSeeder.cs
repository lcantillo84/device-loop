using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace backend.Services
{
    public class DeviceDataSeeder
    {
        private readonly ApplicationDbContext _context;

        public DeviceDataSeeder(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SeedFromJsonAsync(string jsonPath)
        {
            if (await _context.Devices.AnyAsync())
            {
                Console.WriteLine("Database already has data, skipping seed.");
                return;
            }

            if (!File.Exists(jsonPath))
            {
                Console.WriteLine($"JSON file not found: {jsonPath}");
                return;
            }

            var json = await File.ReadAllTextAsync(jsonPath);
            var deviceData = JsonSerializer.Deserialize<List<DeviceJsonModel>>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            if (deviceData == null) return;

            var validDevices = deviceData
                .Where(d => !string.IsNullOrWhiteSpace(d.Brand) && !string.IsNullOrWhiteSpace(d.ModelName))
                .Select(d => new Device
                {
                    Brand = d.Brand.Trim(),
                    ModelName = d.ModelName.Trim(),
                    PriceUsd = ParseDecimal(d.PriceUsd),
                    NetFlawlessPayout = ParseDecimal(d.NetFlawlessPayout),
                    NetVeryGoodPayout = ParseDecimal(d.NetVeryGoodPayout),
                    NetGoodPayout = ParseDecimal(d.NetGoodPayout),
                    NetFairPayout = ParseDecimal(d.NetFairPayout),
                    NetBrokenPayout = ParseDecimal(d.NetBrokenPayout)
                })
                .ToList();

            await _context.Devices.AddRangeAsync(validDevices);
            await _context.SaveChangesAsync();

            Console.WriteLine($"✅ Seeded {validDevices.Count} devices from JSON");
        }

        private static decimal ParseDecimal(string? value) =>
            decimal.TryParse(value, out var result) ? result : 0m;
    }

    public class DeviceJsonModel
    {
        [JsonPropertyName("brand")]
        public string? Brand { get; set; }

        [JsonPropertyName("Model Name")]
        public string? ModelName { get; set; }

        [JsonPropertyName("price_usd")]
        public string? PriceUsd { get; set; }

        [JsonPropertyName("net_flawless_payout")]
        public string? NetFlawlessPayout { get; set; }

        [JsonPropertyName("net_very_good_payout")]
        public string? NetVeryGoodPayout { get; set; }

        [JsonPropertyName("net_good_payout")]
        public string? NetGoodPayout { get; set; }

        [JsonPropertyName("net_fair_payout")]
        public string? NetFairPayout { get; set; }

        [JsonPropertyName("net_broken_payout")]
        public string? NetBrokenPayout { get; set; }
    }
}