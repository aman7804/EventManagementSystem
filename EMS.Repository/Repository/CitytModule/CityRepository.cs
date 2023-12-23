using EMS.Data;
using EMS.Entity.Entity;
using EMS.Repository.Base;
using Microsoft.AspNetCore.Http;

namespace EMS.Repository.Repository.CitytModule
{
    public class CityRepository : BaseRepository<CityEntity>, ICityRepository
    {
        public CityRepository(SqlDbContext sqlDbContext, IHttpContextAccessor httpContextAccessor) : base(sqlDbContext, httpContextAccessor) { }
    }
}
