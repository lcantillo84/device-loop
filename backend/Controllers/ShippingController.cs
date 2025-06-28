using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/shipping")]
    public class ShippingController : ControllerBase
    {
        private readonly UpsShippingService _ups;

        public ShippingController(UpsShippingService ups) => _ups = ups;

        [HttpPost("label")]
        public async Task<IActionResult> CreateLabel([FromBody] ShipmentRequestDto dto)
        {
            var label = await _ups.CreateLabelAsync(dto);
            return Ok(new { label });
        }
        [HttpGet("token")]
        public async Task<IActionResult> GetToken()
        {
            try
            {
                var token = await _ups.GetAccessTokenOnlyAsync();
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
        [HttpPost("label-with-token")]
        public async Task<IActionResult> CreateLabelWithToken([FromBody] ShipmentWithTokenDto request)
        {
            try
            {
                var result = await _ups.CreateLabelWithTokenAsync(request.Shipment, request.Token);
                return Ok(new { response = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

    }
}