using EMS.Entity;
using EMS.Entity.Entity;
using Microsoft.EntityFrameworkCore;

namespace EMS.Data
{
    public class SqlDbContext : DbContext
    {
        public DbSet<UserEntity> User { get; set; } = null!;
        public DbSet<StateEntity> State { get; set; } = null!;

        public SqlDbContext(DbContextOptions<SqlDbContext> options) : base(options)
        {
        }
    }
}
