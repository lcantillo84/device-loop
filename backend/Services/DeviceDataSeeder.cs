using backend.Data;
using backend.Models;
using System.Text.Json;

namespace backend.Services
{
    public class DeviceDataSeeder
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<DeviceDataSeeder> _logger;

        public DeviceDataSeeder(ApplicationDbContext context, ILogger<DeviceDataSeeder> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task SeedFromJsonAsync(string jsonFilePath)
        {
            if (_context.Devices.Any())
            {
                _logger.LogInformation("Database already contains device data. Skipping seed.");
                return;
            }

            try
            {
                var jsonContent = await File.ReadAllTextAsync(jsonFilePath);
                var jsonDevices = JsonSerializer.Deserialize<List<JsonDevice>>(jsonContent);

                if (jsonDevices == null || !jsonDevices.Any())
                {
                    _logger.LogWarning("No devices found in JSON file");
                    return;
                }

                var devices = jsonDevices.Select(MapJsonToDevice).ToList();

                await _context.Devices.AddRangeAsync(devices);
                await _context.SaveChangesAsync();

                _logger.LogInformation($"Successfully seeded {devices.Count} devices from JSON");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error seeding device data from JSON");
                throw;
            }
        }

        private static Device MapJsonToDevice(JsonDevice jsonDevice)
        {
            return new Device
            {
                Brand = jsonDevice.brand ?? string.Empty,
                ModelName = jsonDevice.ModelName ?? string.Empty,
                StorageGB = jsonDevice.storage_gb ?? string.Empty,
                PriceUsd = ParseDecimal(jsonDevice.price_usd),
                LaunchedYear = ParseInt(jsonDevice.LaunchedYear),
                DaysUsed = ParseInt(jsonDevice.days_used),
                PayoutBrandNew = ParseDecimal(jsonDevice.payout_brand_new),
                PayoutFlawless = ParseDecimal(jsonDevice.payout_flawless),
                PayoutVeryGood = ParseDecimal(jsonDevice.payout_very_good),
                PayoutGood = ParseDecimal(jsonDevice.payout_good),
                PayoutFair = ParseDecimal(jsonDevice.payout_fair),
                PayoutBroken = ParseDecimal(jsonDevice.payout_broken),
                TreeCostUsd = ParseDecimal(jsonDevice.tree_cost_usd),
                OverheadCostUsd = ParseDecimal(jsonDevice.overhead_cost_usd),
                NetBrandNewPayout = ParseDecimal(jsonDevice.net_brand_new_payout),
                NetFlawlessPayout = ParseDecimal(jsonDevice.net_flawless_payout),
                NetVeryGoodPayout = ParseDecimal(jsonDevice.net_very_good_payout),
                NetGoodPayout = ParseDecimal(jsonDevice.net_good_payout),
                NetFairPayout = ParseDecimal(jsonDevice.net_fair_payout),
                NetBrokenPayout = ParseDecimal(jsonDevice.net_broken_payout)
            };
        }

        private static decimal ParseDecimal(string? value)
        {
            return decimal.TryParse(value, out var result) ? result : 0m;
        }

        private static int ParseInt(string? value)
        {
            return int.TryParse(value, out var result) ? result : 0;
        }
    }

    // JSON mapping class - matches your JSON structure
    public class JsonDevice
    {
        public string? brand { get; set; }
        public string? storage_gb { get; set; }
        public string? price_usd { get; set; }
        public string? ModelName { get; set; }
        public string? LaunchedYear { get; set; }
        public string? days_used { get; set; }
        public string? payout_brand_new { get; set; }
        public string? payout_flawless { get; set; }
        public string? payout_very_good { get; set; }
        public string? payout_good { get; set; }
        public string? payout_fair { get; set; }
        public string? payout_broken { get; set; }
        public string? tree_cost_usd { get; set; }
        public string? overhead_cost_usd { get; set; }
        public string? net_brand_new_payout { get; set; }
        public string? net_flawless_payout { get; set; }
        public string? net_very_good_payout { get; set; }
        public string? net_good_payout { get; set; }
        public string? net_fair_payout { get; set; }
        public string? net_broken_payout { get; set; }
    }
}