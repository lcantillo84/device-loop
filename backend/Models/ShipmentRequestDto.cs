public class ShipmentRequestDto
{
    public string RecipientName { get; set; } = string.Empty;
    public string AddressLine { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string Zip { get; set; } = string.Empty;
    public double Weight { get; set; } = 1.0; // in pounds
}