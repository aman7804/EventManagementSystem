using EMS.Api.Authorization;
using EMS.Entity;
using EMS.Service.DTO;
using EMS.Service.UserModule;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : BaseController<UserEntity, UserDTO>
    {
        public ProfileController(IUserService userService, IHttpContextAccessor httpContextAccessor) : base(userService, httpContextAccessor) { }

        [HttpPut("update")]
        public async Task<IActionResult> Update(UserDTO dto)
        {
            if (dto.Id != CurrentUser)
                return Unauthorized(new { message = "Unauthorized" });

            await _baseService.UpdateAsync(dto);
            return GetResult<UserDTO>(null, HttpStatusCode.OK);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetProfile(int Id)
        {
            if (Id != CurrentUser)
                return Unauthorized(new { message = "Unauthorized" });
            return GetResult(await _baseService.GetByIdAsync(Id));
        }
    }
}
