using EMS.Data;
using EMS.Entity.Entity;
using EMS.Repository.Base;
using Microsoft.AspNetCore.Http;

namespace EMS.Repository.Repository.DecorationModule
{
    public class DecorationRepository : BaseRepository<DecorationEntity>, IDecorationRepository
    {
        public DecorationRepository(SqlDbContext dbContext, IHttpContextAccessor httpContextAccessor)
            : base(dbContext, httpContextAccessor) { }
    }
}
