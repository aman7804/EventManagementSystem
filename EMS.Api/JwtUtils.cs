using EMS.Service.DTO;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EMS.Api
{
    public class JwtUtils : IJwtUtils
    {
        private readonly JwtBearerOptions _jwtBearerOptions;

        private readonly IConfiguration _config;
        public JwtUtils(IConfiguration config, IOptions<JwtBearerOptions> jwtBearerOptions)
        {
            _config = config;
            _jwtBearerOptions = jwtBearerOptions.Value;
        }

        public string GenerateJwtToken(UserDTO user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            string? jwt_secret = _config["Jwt:Secret"] ?? String.Empty;
            byte[] key = Encoding.ASCII.GetBytes(jwt_secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                }),
                Expires = DateTime.UtcNow.AddHours(24),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return tokenString;
        }

        public int? ValidateJwtToken(string token)
        {
            // Access token validation parameters
            if (token == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenValidationParameters = _jwtBearerOptions.TokenValidationParameters;

                tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var userId = int.Parse(jwtToken.Claims.First(x => x.Type == ClaimTypes.Name).Value);

            return userId;
        }
    }
}
