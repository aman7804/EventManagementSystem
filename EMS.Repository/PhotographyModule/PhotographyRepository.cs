using EMS.Data;
using EMS.Entity;
using EMS.Repository.Base;
using Microsoft.AspNetCore.Http;

namespace EMS.Repository.PhotographyModule
{
    public class PhotographyRepository : BaseRepository<PhotographyEntity>, IPhotographyRepository
    {
        public PhotographyRepository(SqlDbContext dbContext, IHttpContextAccessor httpContextAccessor)
            : base(dbContext, httpContextAccessor) { }
    }
}
