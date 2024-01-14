using EMS.Service.DTO;

namespace EMS.Api.Authorization
{
    public interface IJwtUtils
    {
        public string GenerateJwtToken(int userId);
        public int? ValidateJwtToken(string token);
    }
}
