using EMS.Entity;
using EMS.Repository.StateModule;
using EMS.Service.DTO;
using EMS.Service.Services.StateModule;
using Microsoft.AspNetCore.Mvc;

namespace EMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StateController : BaseController<StateEntity, StateDTO>
    {
        public StateController(IStateService stateService) : base(stateService) { }

        [HttpPost("save")]
        public async Task<IActionResult> SaveStateAsync(StateDTO dto)
        {
            return await Save(dto);
        }

        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteAsync(int Id)
        {
            return await Delete(Id);
        }

        [HttpGet("getById/{Id}")]
        public async Task<IActionResult> GetByIdAsync(int Id)
        {
            return await GetById(Id);
        }

    }
}
