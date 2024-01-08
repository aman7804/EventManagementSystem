using EMS.Data;
using EMS.Entity;
using EMS.Repository.Base;
using Microsoft.AspNetCore.Http;

namespace EMS.Repository.Repository.VenueModule
{
    public class VenueRepository : BaseRepository<VenueEntity>, IVenueRepository
    {
        public VenueRepository(SqlDbContext sqlDbContext, IHttpContextAccessor httpContextAccessor)
            : base(sqlDbContext, httpContextAccessor) { }
    }
}
