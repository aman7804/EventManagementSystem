﻿using EMS.Data;
using EMS.Entity.Entity;
using EMS.Repository.Base;
using Microsoft.AspNetCore.Http;

namespace EMS.Repository.Repository.UserModule
{
    public class UserRepository : BaseRepository<UserEntity>, IUserRepository
    {
        public UserRepository(SqlDbContext sqlDbContext, IHttpContextAccessor httpContextAccessor)
            : base(sqlDbContext, httpContextAccessor) { }
    }
}
