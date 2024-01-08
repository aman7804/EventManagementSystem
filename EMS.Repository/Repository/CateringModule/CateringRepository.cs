using EMS.Data;
using EMS.Entity.Entity;
using EMS.Repository.Base;
using Microsoft.AspNetCore.Http;

namespace EMS.Repository.Repository.CateringModule
{
    public class CateringRepository : BaseRepository<CateringEntity>, ICateringRepository
    {
        public CateringRepository(SqlDbContext dbContext, IHttpContextAccessor contextAccessor)
            : base(dbContext, contextAccessor) { }
    }
}
