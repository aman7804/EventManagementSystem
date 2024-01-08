using EMS.Data;
using EMS.Entity.Entity;
using EMS.Repository.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace EMS.Repository.Repository.PackageModule
{
    public class PackageRepository : BaseRepository<PackageEntity>, IPackageRepository
    {
        public PackageRepository(SqlDbContext dbContext, IHttpContextAccessor contextAccessor) 
            : base(dbContext, contextAccessor){ }
        
        public IQueryable<PackageEntity> GetDraftAndPackages()
        {
            IQueryable<PackageEntity> packages = GetAll(x => ((x.IsDraft == true && x.CreatedBy == CurrentUser) 
                                                                || x.IsDraft == false));
            packages = packages.Include(v => v.Venue)
                               .Include(p => p.Photography)
                               .Include(d => d.Decoration)
                               .Include(c => c.Catering);
            return packages;
        }
    }
}
