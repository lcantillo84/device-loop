using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/shipping")]
public class ShippingController : ControllerBase
{
    [HttpPost("label")]
    public IActionResult CreateLabel([FromBody] object payload)
    {
        return Ok(new { label = "mock-base64-label" });
    }
}
