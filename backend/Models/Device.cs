using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Device
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Brand { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string ModelName { get; set; } = string.Empty;

        [MaxLength(20)]
        public string StorageGB { get; set; } = string.Empty;

        [Column(TypeName = "decimal(10,2)")]
        public decimal PriceUsd { get; set; }

        public int LaunchedYear { get; set; }

        public int DaysUsed { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal PayoutBrandNew { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal PayoutFlawless { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal PayoutVeryGood { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal PayoutGood { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal PayoutFair { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal PayoutBroken { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal TreeCostUsd { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal OverheadCostUsd { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal NetBrandNewPayout { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal NetFlawlessPayout { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal NetVeryGoodPayout { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal NetGoodPayout { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal NetFairPayout { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal NetBrokenPayout { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}