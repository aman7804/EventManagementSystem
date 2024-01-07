using EMS.Data;
using EMS.Entity.Entity;
using EMS.Repository.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.Identity.Client;
using System.Linq.Expressions;

namespace EMS.Repository.Repository.PackageModule
{
    public class PackageRepository : BaseRepository<PackageEntity>, IPackageRepository
    {
        public PackageRepository(SqlDbContext dbContext, IHttpContextAccessor contextAccessor) : base(dbContext, contextAccessor){ }

    }
}
