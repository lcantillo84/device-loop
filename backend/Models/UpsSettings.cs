namespace backend.Models
{
    public class UpsSettings
    {
        public string BaseUrl { get; set; } = default!;
        public string ClientId { get; set; } = default!;
        public string ClientSecret { get; set; } = default!;
        public string AccountNumber { get; set; } = default!;
    }

}