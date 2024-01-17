using EMS.Service.DTO;

namespace EMS.Api.Authorization
{
    public interface IJwtUtils
    {
        public string GenerateJwtToken(int userId, string role);
        //public int? ValidateJwtToken(string token);
    }
}
