using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EMS.Api.Authorization
{
    public class JwtUtils : IJwtUtils
    {
        private readonly SymmetricSecurityKey key;
        public JwtUtils(IConfiguration config)
        {
            string? jwt_secret = config["Jwt:Secret"] ?? string.Empty;
            key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt_secret));
        }

        public string GenerateJwtToken(int userId, string role)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(JwtRegisteredClaimNames.Name, userId.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Role, role),
                }),
                Expires = DateTime.UtcNow.AddHours(24),
                SigningCredentials = new SigningCredentials(key,
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return tokenString;
        }

        //public int? ValidateJwtToken(string token)
        //{
        //    if (token == null)
        //        return null;

        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    try
        //    {
        //        tokenHandler.ValidateToken(token, new TokenValidationParameters
        //        {
        //            ValidateIssuerSigningKey = true,
        //            IssuerSigningKey = new SymmetricSecurityKey(key),
        //            ValidateIssuer = false,
        //            ValidateAudience = false,
        //            // set clockskew to zero so tokens expire exactly at token expiration time
        //            // (instead of 5 minutes later)
        //            ClockSkew = TimeSpan.Zero
        //        }, out SecurityToken validatedToken);

        //        var jwtToken = (JwtSecurityToken)validatedToken;
        //        var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "userId").Value);

        //        // return user id from JWT token if validation successful
        //        return userId;
        //    }
        //    catch
        //    {
        //        // return null if validation fails
        //        return null;
        //    }
        //}
    }
}
