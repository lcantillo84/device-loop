using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SeedController : ControllerBase
    {
        private readonly DeviceDataSeeder _seeder;
        private readonly IWebHostEnvironment _environment;

        public SeedController(DeviceDataSeeder seeder, IWebHostEnvironment environment)
        {
            _seeder = seeder;
            _environment = environment;
        }

        [HttpPost("devices")]
        public async Task<IActionResult> SeedDevices()
        {
            try
            {
                // Look for devices.json in the wwwroot folder or project root
                var jsonPath = Path.Combine(_environment.ContentRootPath, "Data", "test.json");
                
                if (!System.IO.File.Exists(jsonPath))
                {
                    return BadRequest($"JSON file not found at: {jsonPath}");
                }

                await _seeder.SeedFromJsonAsync(jsonPath);
                return Ok(new { message = "Device data seeded successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}