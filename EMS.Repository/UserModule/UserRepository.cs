using EMS.Data;
using EMS.Entity;
using EMS.Repository.Base;
using Microsoft.AspNetCore.Http;

namespace EMS.Repository.UserModule
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(SqlDbContext sqlDbContext, IHttpContextAccessor httpContextAccessor) 
            : base(sqlDbContext, httpContextAccessor)
        { }
    }
}
