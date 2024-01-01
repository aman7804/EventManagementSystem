using EMS.Entity.Entity;
using EMS.Service.DTO;
using EMS.Service.Services.StateModule;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StateController : BaseController<StateEntity, StateDTO>
    {
        public StateController(IStateService stateService) : base(stateService) { }

        [HttpPost("save")]
        public async Task<IActionResult> SaveState(StateDTO dto)
        {
            if (dto.Id == 0)
            {
                await _baseService.AddAsync(dto);
                return GetResult<StateDTO>(null, HttpStatusCode.OK);
            }
            else
            {
                await _baseService.UpdateAsync(dto);
                return GetResult<StateDTO>(null, HttpStatusCode.OK);
            }
        }

        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteState(int Id)
        {
            await _baseService.DeleteAsync(Id);
            return GetResult<StateDTO>(null, HttpStatusCode.OK );
        }

        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id)
        {
            return GetResult<StateDTO>(await _baseService.GetByIdAsync(Id));
        }

        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<StateDTO> pagination)
        {

            return GetResult<PaginationDTO<StateDTO>>( await _baseService.GetPageAsync(pagination));
        }

        [HttpGet("dropDownList")]
        public async Task<IActionResult> GetDropdownList()
        {
            return GetResult<List<StateDTO>>(await _baseService.GetAllAsync(x => true));
        }
    }
}