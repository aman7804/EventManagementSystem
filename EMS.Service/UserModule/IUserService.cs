using EMS.Entity;
using EMS.Service.Base;
using EMS.Service.DTO;

namespace EMS.Service.UserModule
{
    public interface IUserService : IBaseService<UserEntity, UserDTO> {
    Task UpdateProfileAsync(UserDTO dto);

    }
}