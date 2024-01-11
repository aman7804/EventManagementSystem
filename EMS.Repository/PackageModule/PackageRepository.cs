using EMS.Data;
using EMS.Entity;
using EMS.Repository.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace EMS.Repository.PackageModule
{
    public class PackageRepository : BaseRepository<PackageEntity>, IPackageRepository
    {
        public PackageRepository(SqlDbContext dbContext, IHttpContextAccessor contextAccessor)
            : base(dbContext, contextAccessor) { }

        public override async Task<PackageEntity?> GetAsync(Expression<Func<PackageEntity, bool>> predicate, bool asNoTracking = false)
        {
            IQueryable<PackageEntity> query = GetAll(predicate);
            query = query.Include(v => v.Venue)
                         .Include(p => p.Photography)
                         .Include(d => d.Decoration)
                         .Include(c => c.Catering);

            if (asNoTracking)
                query = query.AsNoTracking();

            return await query.FirstOrDefaultAsync();
        }
    }
}
