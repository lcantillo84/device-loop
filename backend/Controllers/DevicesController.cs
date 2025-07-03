// using backend.Data;
// using backend.Models;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
//
// namespace backend.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class DevicesController : ControllerBase
//     {
//         private readonly ApplicationDbContext _context;
//
//         public DevicesController(ApplicationDbContext context)
//         {
//             _context = context;
//         }
//
//         [HttpGet]
//         public async Task<ActionResult<IEnumerable<Device>>> GetDevices()
//         {
//             return await _context.Devices.ToListAsync();
//         }
//
//         [HttpGet("brands")]
//         public async Task<ActionResult<IEnumerable<string>>> GetBrands()
//         {
//             var brands = await _context.Devices
//                 .Select(d => d.Brand)
//                 .Distinct()
//                 .OrderBy(b => b)
//                 .ToListAsync();
//             
//             return Ok(brands);
//         }
//
//         [HttpGet("brands/{brand}/models")]
//         public async Task<ActionResult<IEnumerable<string>>> GetModelsByBrand(string brand)
//         {
//             var models = await _context.Devices
//                 .Where(d => d.Brand == brand)
//                 .Select(d => d.ModelName)
//                 .Distinct()
//                 .OrderBy(m => m)
//                 .ToListAsync();
//             
//             return Ok(models);
//         }
//
//         [HttpGet("pricing")]
//         public async Task<ActionResult<Device>> GetDevicePricing(
//             [FromQuery] string brand, 
//             [FromQuery] string modelName)
//         {
//             if (string.IsNullOrEmpty(brand) || string.IsNullOrEmpty(modelName))
//             {
//                 return BadRequest("Brand and ModelName are required");
//             }
//
//             var device = await _context.Devices
//                 .FirstOrDefaultAsync(d => d.Brand == brand && d.ModelName == modelName);
//
//             if (device == null)
//             {
//                 return NotFound($"Device not found: {brand} {modelName}");
//             }
//
//             return Ok(device);
//         }
//
//         [HttpGet("{id}")]
//         public async Task<ActionResult<Device>> GetDevice(int id)
//         {
//             var device = await _context.Devices.FindAsync(id);
//
//             if (device == null)
//             {
//                 return NotFound();
//             }
//
//             return device;
//         }
//
//         [HttpPost]
//         public async Task<ActionResult<Device>> PostDevice(Device device)
//         {
//             _context.Devices.Add(device);
//             await _context.SaveChangesAsync();
//
//             return CreatedAtAction("GetDevice", new { id = device.Id }, device);
//         }
//
//         [HttpPut("{id}")]
//         public async Task<IActionResult> PutDevice(int id, Device device)
//         {
//             if (id != device.Id)
//             {
//                 return BadRequest();
//             }
//
//             _context.Entry(device).State = EntityState.Modified;
//
//             try
//             {
//                 await _context.SaveChangesAsync();
//             }
//             catch (DbUpdateConcurrencyException)
//             {
//                 if (!DeviceExists(id))
//                 {
//                     return NotFound();
//                 }
//                 else
//                 {
//                     throw;
//                 }
//             }
//
//             return NoContent();
//         }
//
//         [HttpDelete("{id}")]
//         public async Task<IActionResult> DeleteDevice(int id)
//         {
//             var device = await _context.Devices.FindAsync(id);
//             if (device == null)
//             {
//                 return NotFound();
//             }
//
//             _context.Devices.Remove(device);
//             await _context.SaveChangesAsync();
//
//             return NoContent();
//         }
//
//         private bool DeviceExists(int id)
//         {
//             return _context.Devices.Any(e => e.Id == id);
//         }
//     }
// }
using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DevicesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public DevicesController(ApplicationDbContext context) => _context = context;

        [HttpGet("brands")]
        public async Task<IActionResult> GetBrands()
        {
            var brands = await _context.Devices.Select(d => d.Brand).Distinct().ToListAsync();
            return Ok(brands);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchDevices(string? brand = null, string? model = null)
        {
            var query = _context.Devices.AsQueryable();
            if (!string.IsNullOrEmpty(brand)) query = query.Where(d => d.Brand.Contains(brand));
            if (!string.IsNullOrEmpty(model)) query = query.Where(d => d.ModelName.Contains(model));
            return Ok(await query.ToListAsync());
        }
    }
}