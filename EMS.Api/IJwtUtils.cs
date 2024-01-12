using EMS.Service.DTO;

namespace EMS.Api
{
    public interface IJwtUtils
    {
        public string GenerateJwtToken(UserDTO user);
        public int? ValidateJwtToken(string token);
    }
}
