using EMS.Data;
using EMS.Entity;
using EMS.Repository.Base;
using Microsoft.AspNetCore.Http;

namespace EMS.Repository.DecorationModule
{
    public class DecorationRepository : BaseRepository<DecorationEntity>, IDecorationRepository
    {
        public DecorationRepository(SqlDbContext dbContext, IHttpContextAccessor httpContextAccessor)
            : base(dbContext, httpContextAccessor) { }
    }
}
