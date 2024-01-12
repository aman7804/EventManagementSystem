using EMS.Entity;
using EMS.Service.DTO;
using EMS.Service.UserModule;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : BaseController<UserEntity, UserDTO>
    {
        private readonly IAuthService _authService;

        public AuthController(IConfiguration config, IAuthService authService) : base(authService)
        {
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            await _authService.Login(dto);
            return GetResult<object>(new { Token = _authService.GetToken()});
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

        

    }
}
