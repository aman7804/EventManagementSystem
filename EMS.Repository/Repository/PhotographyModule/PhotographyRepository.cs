using EMS.Data;
using EMS.Entity.Entity;
using EMS.Repository.Base;
using Microsoft.AspNetCore.Http;

namespace EMS.Repository.Repository.PhotographyModule
{
    public class PhotographyRepository : BaseRepository<PhotographyEntity> ,IPhotographyRepository
    {
        public PhotographyRepository(SqlDbContext dbContext, IHttpContextAccessor httpContextAccessor) : base(dbContext, httpContextAccessor) { }
    }
}
