using EMS.Entity;
using EMS.Entity.Entity;
using Microsoft.EntityFrameworkCore;
using System.Reflection.PortableExecutable;

namespace EMS.Data
{
    public class SqlDbContext : DbContext
    {
        public DbSet<UserEntity> User { get; set; } = null!;
        public DbSet<StateEntity> State { get; set; } = null!;
        public DbSet<CityEntity> City { get; set; } = null!;
        public DbSet<VenueEntity> Venue { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<VenueEntity>()
                .Property(b => b.IsChecked)
                .HasDefaultValueSql("0");
            
            modelBuilder.Entity<VenueEntity>()
                .Property(b => b.IsActive)
                .HasDefaultValueSql("0");
            
            modelBuilder.Entity<VenueEntity>()
                .Property(b => b.IsAvailable)
                .HasDefaultValueSql("1");

            base.OnModelCreating(modelBuilder);
        }

        public SqlDbContext(DbContextOptions<SqlDbContext> options) : base(options)
        {
        }
    }
}
