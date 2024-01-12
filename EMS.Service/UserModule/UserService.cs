using AutoMapper;
using EMS.Entity;
using EMS.Repository.Base;
using EMS.Service.Base;
using EMS.Service.DTO;

namespace EMS.Service.UserModule
{
    public class UserService : BaseService<UserEntity, UserDTO>, IUserService
    {
        public UserService(IMapper mapper, IBaseRepository<UserEntity> userRepo) : base(mapper, userRepo) { }
    }
}
