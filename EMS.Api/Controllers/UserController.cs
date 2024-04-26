using EMS.Entity;
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

        [HttpPut("update-profile")]
        public async Task<IActionResult> UpdateProfile(UserDTO dto)
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
            if(dto.Id == 0)
            {
                RegisterDTO userDto = service.Map<SaveUserDTO, RegisterDTO>(dto);
                userDto.Password = _authService.GeneratePassword();
                await _authService.RegisterUser(userDto);
				return GetResult<UserDTO>(null, HttpStatusCode.OK);
			}
            else
            {   
                UserDTO userDto = service.Map<SaveUserDTO, UserDTO>(dto);
                UserDTO user = await service.GetByIdAsync(userDto.Id, true);
                if(user != null)  await service.UpdateAsync(userDto);
                return GetResult<UserDTO>(null, HttpStatusCode.OK);
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

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            if (CurrentUser <= 0)
                return Unauthorized(new { message = "Unauthorized" });
            return GetResult(await service.GetByIdAsync(CurrentUser));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<UserDTO, UserFilter> pagination) =>
            GetResult(await service.GetPageAsync(pagination));
    }
}
