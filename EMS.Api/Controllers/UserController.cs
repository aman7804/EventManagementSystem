using EMS.Service.DTO;
using EMS.Service.DTO.Filter;
using EMS.Service.UserModule;
using EMS.Shared.Constant;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using System.Net;

namespace EMS.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        private readonly IUserService service;
        private readonly IAuthService _authService;
        public UserController(IUserService userService, IAuthService authService, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor)
            {
                service = userService;
                _authService = authService;
            }

        [HttpPut("update")]
        public async Task<IActionResult> Update(UserDTO dto)
        {
            if (dto.Id != CurrentUser)
                return Unauthorized(new { message = "Unauthorized" });

            await service.UpdateAsync(dto);
            return GetResult<UserDTO>(null, HttpStatusCode.OK);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("save")]
        public async Task<IActionResult> SaveUser(SaveUserDTO dto)
        {

            if (dto.Id > 0 && dto.Password == "")
            {
                UserDTO userDto = service.Map<SaveUserDTO, UserDTO>(dto);
                UserDTO user = await service.GetByIdAsync(userDto.Id, true);
                if(user != null)
                    await service.UpdateAsync(userDto);
                return GetResult<UserDTO>(null, HttpStatusCode.OK);
            }
            else if(dto.Id == 0 && dto.Password != "")
            {
                RegisterDTO userDto = service.Map<SaveUserDTO, RegisterDTO>(dto);
                return GetResult(new AuthenticateResponseDTO(await _authService.RegisterUser(userDto), null));
            }
            else
            {
                return GetResult(new Exception("INVALID CREDENTIALS"));
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteVenue(int Id)
        {
            await service.DeleteAsync(Id);
            return GetResult<UserDTO>(null, HttpStatusCode.OK);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id) =>
            GetResult(await service.GetByIdAsync(Id));

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetProfile(int Id)
        {
            if (Id != CurrentUser)
                return Unauthorized(new { message = "Unauthorized" });
            return GetResult(await service.GetByIdAsync(Id));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<UserDTO, UserFilter> pagination) =>
            GetResult(await service.GetPageAsync(pagination));
    }
}
