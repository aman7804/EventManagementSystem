using AutoMapper;
using EMS.Entity;
using EMS.Repository.UserModule;
using EMS.Service.Base;
using EMS.Service.DTO;

namespace EMS.Service.UserModule
{
    public class UserService : BaseService<UserEntity, UserDTO>, IUserService
    {
        public UserService(IMapper mapper, IUserRepository userRepository) : base(mapper, userRepository) { }
    }
}
