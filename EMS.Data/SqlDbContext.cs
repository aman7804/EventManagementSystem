using EMS.Entity;
using Microsoft.EntityFrameworkCore;

namespace EMS.Data
{
    public class SqlDbContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;

        public SqlDbContext(DbContextOptions<SqlDbContext> options) : base(options)
        {
        }
    }
}
