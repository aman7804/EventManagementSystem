using EMS.Data;
using EMS.Entity;
using EMS.Repository.Base;
using Microsoft.AspNetCore.Http;

namespace EMS.Repository.Repository.StateModule
{
    public class StateRepository : BaseRepository<StateEntity>, IStateRepository
    {
        public StateRepository(SqlDbContext sqlDbContext, IHttpContextAccessor httpContextAccessor) : base(sqlDbContext, httpContextAccessor) { }
    }
}
