
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace backend.Models
{
    // Request Models
    public class ShipmentRequest
    {
        [JsonPropertyName("ShipmentRequest")]
        public ShipmentRequestBody Body { get; set; } = new ShipmentRequestBody();
    }

    public class ShipmentRequestBody
    {
        [JsonPropertyName("Shipment")]
        public Shipment Shipment { get; set; } = new Shipment();

        [JsonPropertyName("LabelSpecification")]
        public LabelSpecification LabelSpecification { get; set; } = new LabelSpecification();
    }

    public class Shipment
    {
        [JsonPropertyName("Shipper")]
        public Shipper Shipper { get; set; } = new Shipper();

        [JsonPropertyName("ShipTo")]
        public ShipTo ShipTo { get; set; } = new ShipTo();

        [JsonPropertyName("Service")]
        public Service Service { get; set; } = new Service();

        [JsonPropertyName("Package")]
        public List<Package> Package { get; set; } = new List<Package>();
    }

    public class Shipper
    {
        [JsonPropertyName("Name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("ShipperNumber")]
        public string ShipperNumber { get; set; } = string.Empty;

        [JsonPropertyName("Address")]
        public Address Address { get; set; } = new Address();
    }

    public class ShipTo
    {
        [JsonPropertyName("Name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("Address")]
        public Address Address { get; set; } = new Address();
    }

    public class Address
    {
        [JsonPropertyName("AddressLine")]
        public List<string> AddressLine { get; set; } = new List<string>();

        [JsonPropertyName("City")]
        public string City { get; set; } = string.Empty;

        [JsonPropertyName("StateProvinceCode")]
        public string StateProvinceCode { get; set; } = string.Empty;

        [JsonPropertyName("PostalCode")]
        public string PostalCode { get; set; } = string.Empty;

        [JsonPropertyName("CountryCode")]
        public string CountryCode { get; set; } = string.Empty;
    }

    public class Service
    {
        [JsonPropertyName("Code")]
        public string Code { get; set; } = string.Empty;

        [JsonPropertyName("Description")]
        public string Description { get; set; } = string.Empty;
    }

    public class Package
    {
        [JsonPropertyName("Packaging")]
        public Packaging Packaging { get; set; } = new Packaging();

        [JsonPropertyName("PackageWeight")]
        public PackageWeight PackageWeight { get; set; } = new PackageWeight();
    }

    public class Packaging
    {
        [JsonPropertyName("Code")]
        public string Code { get; set; } = string.Empty;
    }

    public class PackageWeight
    {
        [JsonPropertyName("UnitOfMeasurement")]
        public UnitOfMeasurement UnitOfMeasurement { get; set; } = new UnitOfMeasurement();

        [JsonPropertyName("Weight")]
        public string Weight { get; set; } = string.Empty;
    }

    public class UnitOfMeasurement
    {
        [JsonPropertyName("Code")]
        public string Code { get; set; } = string.Empty;
    }

    public class LabelSpecification
    {
        [JsonPropertyName("LabelImageFormat")]
        public LabelImageFormat LabelImageFormat { get; set; } = new LabelImageFormat();
    }

    public class LabelImageFormat
    {
        [JsonPropertyName("Code")]
        public string Code { get; set; } = string.Empty;
    }

    // Response Models
    public class ShipmentResponse
    {
        [JsonPropertyName("ShipmentResponse")]
        public ShipmentResponseBody Body { get; set; } = new ShipmentResponseBody();
    }

    public class ShipmentResponseBody
    {
        [JsonPropertyName("ShipmentResults")]
        public ShipmentResults ShipmentResults { get; set; } = new ShipmentResults();
    }

    public class ShipmentResults
    {
        [JsonPropertyName("ShipmentIdentificationNumber")]
        public string ShipmentIdentificationNumber { get; set; } = string.Empty;

        [JsonPropertyName("PackageResults")]
        public List<PackageResult> PackageResults { get; set; } = new List<PackageResult>();
    }

    public class PackageResult
    {
        [JsonPropertyName("TrackingNumber")]
        public string TrackingNumber { get; set; } = string.Empty;

        [JsonPropertyName("LabelImage")]
        public LabelImage LabelImage { get; set; } = new LabelImage();
    }

    public class LabelImage
    {
        [JsonPropertyName("LabelImageFormat")]
        public LabelImageFormat LabelImageFormat { get; set; } = new LabelImageFormat();

        [JsonPropertyName("GraphicImage")]
        public string GraphicImage { get; set; } = string.Empty;
    }
}
