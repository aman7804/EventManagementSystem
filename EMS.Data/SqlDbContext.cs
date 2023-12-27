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
            base.OnModelCreating(modelBuilder);
        }


        public SqlDbContext(DbContextOptions<SqlDbContext> options) : base(options)
        {
        }
    }
}
