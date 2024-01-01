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
        public DbSet<DecorationEntity> Decoration { get; set; } = null!;
        public DbSet<CateringEntity> Catering { get; set; } = null!;
        public DbSet<PhotographyEntity> Photography { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CityEntity>()
                .HasOne(x => x.State)
                .WithMany()
                .HasForeignKey(v => v.StateId)
                .HasConstraintName("FK_City_State_StateId")
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<VenueEntity>()
                .HasOne(v => v.City)
                .WithMany()
                .HasForeignKey(v => v.CityId)
                .HasConstraintName("FK_Venue_City_CityId")
                .OnDelete(DeleteBehavior.Cascade);
            
            modelBuilder.Entity<DecorationEntity>()
                .HasOne(v => v.City)
                .WithMany()
                .HasForeignKey(v => v.CityId)
                .HasConstraintName("FK_Decoration_City_CityId")
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CateringEntity>()
                .HasOne(v => v.City)
                .WithMany()
                .HasForeignKey(v => v.CityId)
                .HasConstraintName("FK_Catering_City_CityId")
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }


        public SqlDbContext(DbContextOptions<SqlDbContext> options) : base(options)
        {
        }
    }
}
