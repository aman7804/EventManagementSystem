using EMS.Data;
using EMS.Entity;
using EMS.Repository.Base;
using Microsoft.AspNetCore.Http;

namespace EMS.Repository.PackageModule
{
    public class PackageRepository : BaseRepository<PackageEntity>, IPackageRepository
    {
        public PackageRepository(SqlDbContext dbContext, IHttpContextAccessor contextAccessor)
            : base(dbContext, contextAccessor) { }
    }
}
