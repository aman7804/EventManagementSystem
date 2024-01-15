using EMS.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EMS.Data
{
    public class SqlDbContext : DbContext
    {
        public DbSet<UserEntity> User { get; set; } = null!;
        public DbSet<StateEntity> State { get; set; } = null!;
        public DbSet<CityEntity> City { get; set; } = null!;
        public DbSet<VenueEntity> Venue { get; set; } = null!;
        public DbSet<DecorationEntity> Decoration { get; set; } = null!;
        public DbSet<CateringEntity> Catering { get; set; } = null!;
        public DbSet<PhotographyEntity> Photography { get; set; } = null!;
        public DbSet<PackageEntity> Package { get; set; } = null!;
        public DbSet<BookingEntity> Booking { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
                relationship.DeleteBehavior = DeleteBehavior.NoAction;
            Seed.InsertDefaultData(modelBuilder);

            modelBuilder.Entity<UserEntity>()
                .Property(u => u.Address)
                .IsRequired();

            modelBuilder.Entity<UserEntity>()
                .Property(u => u.CityId)
                .IsRequired();
        }
        public SqlDbContext(DbContextOptions<SqlDbContext> options) : base(options) { }
    }
}
