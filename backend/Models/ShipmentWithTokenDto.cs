public class ShipmentWithTokenDto
{
    public string Token { get; set; } = string.Empty;
    public ShipmentRequestDto Shipment { get; set; } = new();
}