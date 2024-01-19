using EMS.Api.Authorization;
using EMS.Service.DTO;
using EMS.Service.UserModule;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : BaseController
    {
        private readonly IAuthService _authService;
        private readonly IJwtUtils _jwtUtils;

        public AuthController(IAuthService authService, IJwtUtils jwtUtils, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor)
        {
            _authService = authService;
            _jwtUtils = jwtUtils;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            var userDto = await _authService.Login(dto);
            return GetResult(new AuthenticateResponseDTO(userDto,
                _jwtUtils.GenerateJwtToken(userDto.Id)));
        }

        [HttpPost("signup")]
        public async Task<IActionResult> RegisterUser(RegisterDTO dto) =>
            GetResult( new AuthenticateResponseDTO(await _authService.RegisterUser(dto), null));

    }
}
