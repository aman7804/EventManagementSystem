using EMS.Entity;
using EMS.Service.DTO;
using EMS.Service.UserModule;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace EMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : BaseController<UserEntity, UserDTO>
    {
        private readonly IConfiguration _config;
        private readonly IAuthService _authService;

        public AuthController(IConfiguration config, IAuthService authService) : base(authService)
        {
            _config = config;
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            await _authService.Login(dto);
            return GetResult<object>(new { Token = GetToken() });
        }

        [AllowAnonymous]
        [HttpPost("signup")]
        public async Task<IActionResult> RegisterUser(RegisterDTO dto)
        {
            await _authService.RegisterUserAsync(dto);
            return GetResult<UserDTO>(null, HttpStatusCode.OK);
        }

        [AllowAnonymous]
        [HttpGet("forgot-password/{Id}")]
        public async Task<IActionResult> GetByEmailId(string Id) =>
            GetResult<UserDTO>(await _authService.GetByEmailId(Id));

        public string GetToken()
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(_config["Jwt:Secret"] ?? String.Empty);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, "userId")
                }),
                Expires = DateTime.UtcNow.AddHours(24),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }

    }
}
