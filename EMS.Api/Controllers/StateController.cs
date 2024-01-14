using EMS.Entity;
using EMS.Service.DTO;
using EMS.Service.StateModule;
using Microsoft.AspNetCore.Mvc; 
using System.Net;
using EMS.Api.Authorization;

namespace EMS.Api.Controllers
{
    [Authorize(Shared.EnumRole.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class StateController : BaseController<StateEntity, StateDTO>
    {
        public StateController(IStateService stateService) : base(stateService) { }

        [HttpPost("save")]
        public async Task<IActionResult> SaveState(StateDTO dto)
        {
            if (dto.Id == 0)
                await _baseService.AddAsync(dto);
            else
                await _baseService.UpdateAsync(dto);
            return GetResult<StateDTO>(null, HttpStatusCode.OK);
        }

        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteState(int Id)
        {
            await _baseService.DeleteAsync(Id);
            return GetResult<StateDTO>(null, HttpStatusCode.OK );
        }

        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id) =>
            GetResult<StateDTO>(await _baseService.GetByIdAsync(Id));

        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<StateDTO> pagination) =>
            GetResult( await _baseService.GetPageAsync(pagination));

        [AllowAnonymous]
        [HttpGet("dropDownList")]
        public async Task<IActionResult> GetDropdownList() =>
            GetResult(await _baseService.GetAllAsync(x => true));
    }
}