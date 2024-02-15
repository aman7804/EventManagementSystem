using EMS.Service.DTO;
using EMS.Service.DTO.Filter;
using EMS.Service.UserModule;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        private readonly IUserService service;
        public UserController(IUserService userService, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor) =>
                service = userService;

        [HttpPut("update")]
        public async Task<IActionResult> Update(UserDTO dto)
        {
            if (dto.Id != CurrentUser)
                return Unauthorized(new { message = "Unauthorized" });

            await service.UpdateAsync(dto);
            return GetResult<UserDTO>(null, HttpStatusCode.OK);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetProfile(int Id)
        {
            if (Id != CurrentUser)
                return Unauthorized(new { message = "Unauthorized" });
            return GetResult(await service.GetByIdAsync(Id));
        }

        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<UserDTO, UserFilter> pagination) =>
            GetResult(await service.GetPageAsync(pagination));
    }
}
