using EMS.Api.Authorization;
using EMS.Entity;
using EMS.Service.DTO;
using EMS.Service.UserModule;
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

        public AuthController(IAuthService authService, IJwtUtils jwtUtils, IHttpContextAccessor httpContextAccessor)
            : base(authService, httpContextAccessor)
        {
            _authService = authService;
            _jwtUtils = jwtUtils;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            var userDto = await _authService.Login(dto);
            return GetResult( new AuthenticateResponseDTO(userDto, _jwtUtils.GenerateJwtToken(userDto.Id)) );
        }

        [HttpPost("signup")]
        public async Task<IActionResult> RegisterUser(RegisterDTO dto)
        {
            var userDto = await _authService.RegisterUser(dto);
            return GetResult( new AuthenticateResponseDTO(userDto, _jwtUtils.GenerateJwtToken(userDto.Id)) );
        }

        [HttpGet("forgot-password/{Id}")]
        public async Task<IActionResult> GetByEmailId(string Id) =>
            GetResult(await _authService.GetByEmailId(Id));

        [Authorize]
        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassowrd(ChangePasswordDTO cpd)
        {
            await _authService.ChangePassword(cpd);
            return GetResult<ChangePasswordDTO>(null, HttpStatusCode.OK);
        }

    }
}
