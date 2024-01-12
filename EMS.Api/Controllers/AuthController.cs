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
        private readonly IJwtUtils _jwtUtils;

        public AuthController(IConfiguration config, IAuthService authService, IJwtUtils jwtUtils) : base(authService)
        {
            _authService = authService;
            _jwtUtils = jwtUtils;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            var userDto = await _authService.Login(dto);
            return GetResult( new AuthenticateResponseDTO(userDto, _jwtUtils.GenerateJwtToken(userDto)) );
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
            GetResult(await _authService.GetByEmailId(Id));

        

    }
}
