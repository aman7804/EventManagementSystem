using EMS.Entity;
using EMS.Service.Base;
using EMS.Service.DTO;

namespace EMS.Service.UserModule
{
    public interface IAuthService : IBaseService<UserEntity, UserDTO>
    {
        Task<UserDTO> Login(LoginDTO user);
        Task ChangePassword(ChangePasswordDTO changePasswordDTO);
        Task<UserDTO> GetByEmailId(string emailId);
    }
}
