using EMS.Service.DTO;
using EMS.Service.StateModule;
using Microsoft.AspNetCore.Mvc; 
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace EMS.Api.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class StateController : BaseController
    {
        private readonly IStateService service;
        public StateController(IStateService stateService, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor) =>
            service = stateService;

        [HttpPost("save")]
        public async Task<IActionResult> SaveState(StateDTO dto)
        {
            if (dto.Id == 0)
                await service.AddAsync(dto);
            else
                await service.UpdateAsync(dto);
            return GetResult<StateDTO>(null, HttpStatusCode.OK);
        }

        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteState(int Id)
        {
            await service.DeleteAsync(Id);
            return GetResult<StateDTO>(null, HttpStatusCode.OK );
        }

        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id) =>
            GetResult(await service.GetByIdAsync(Id));

        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<StateDTO> pagination) =>
            GetResult(await service.GetPageAsync(pagination));

        [AllowAnonymous]
        [HttpGet("dropDownList")]
        public async Task<IActionResult> GetDropdownList() =>
            GetResult(await service.GetAllAsync(x => true));
    }
}