// using backend.Models;
// using Microsoft.EntityFrameworkCore;
//
// namespace backend.Data
// {
//     public class ApplicationDbContext : DbContext
//     {
//         public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
//         {
//         }
//
//         public DbSet<Device> Devices { get; set; }
//
//         protected override void OnModelCreating(ModelBuilder modelBuilder)
//         {
//             base.OnModelCreating(modelBuilder);
//
//             // Configure Device entity
//             modelBuilder.Entity<Device>(entity =>
//             {
//                 // Create indexes for better query performance
//                 entity.HasIndex(e => e.Brand);
//                 entity.HasIndex(e => e.ModelName);
//                 entity.HasIndex(e => new { e.Brand, e.ModelName });
//                 entity.HasIndex(e => e.LaunchedYear);
//
//                 // Configure decimal precision
//                 entity.Property(e => e.PriceUsd).HasPrecision(10, 2);
//                 entity.Property(e => e.PayoutBrandNew).HasPrecision(10, 2);
//                 entity.Property(e => e.PayoutFlawless).HasPrecision(10, 2);
//                 entity.Property(e => e.PayoutVeryGood).HasPrecision(10, 2);
//                 entity.Property(e => e.PayoutGood).HasPrecision(10, 2);
//                 entity.Property(e => e.PayoutFair).HasPrecision(10, 2);
//                 entity.Property(e => e.PayoutBroken).HasPrecision(10, 2);
//                 entity.Property(e => e.TreeCostUsd).HasPrecision(10, 2);
//                 entity.Property(e => e.OverheadCostUsd).HasPrecision(10, 2);
//                 entity.Property(e => e.NetBrandNewPayout).HasPrecision(10, 2);
//                 entity.Property(e => e.NetFlawlessPayout).HasPrecision(10, 2);
//                 entity.Property(e => e.NetVeryGoodPayout).HasPrecision(10, 2);
//                 entity.Property(e => e.NetGoodPayout).HasPrecision(10, 2);
//                 entity.Property(e => e.NetFairPayout).HasPrecision(10, 2);
//                 entity.Property(e => e.NetBrokenPayout).HasPrecision(10, 2);
//             });
//         }
//
//         public override int SaveChanges()
//         {
//             UpdateTimestamps();
//             return base.SaveChanges();
//         }
//
//         public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
//         {
//             UpdateTimestamps();
//             return base.SaveChangesAsync(cancellationToken);
//         }
//
//         private void UpdateTimestamps()
//         {
//             var entries = ChangeTracker.Entries<Device>()
//                 .Where(e => e.State == EntityState.Modified);
//
//             foreach (var entry in entries)
//             {
//                 entry.Entity.UpdatedAt = DateTime.UtcNow;
//             }
//         }
//     }
// }
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Device> Devices { get; set; }
    }
}