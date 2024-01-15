using EMS.Api.Authorization;
using EMS.Entity;
using EMS.Service.CityModule;
using EMS.Service.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Authorize(Shared.EnumRole.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : BaseController<CityEntity, CityDTO>
    {
        public CityController(ICityService cityService, IHttpContextAccessor httpContextAccessor)
            : base(cityService, httpContextAccessor) { }

        [HttpPost("save")]
        public async Task<IActionResult> SaveCity(CityDTO dto)
        {
            if (dto.Id == 0)
                await _baseService.AddAsync(dto);
            else
                await _baseService.UpdateAsync(dto);
            return GetResult<CityDTO>(null, HttpStatusCode.OK);
        }
    
        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteCity(int Id)
        {
            await _baseService.DeleteAsync(Id);
            return GetResult<CityDTO>(null, HttpStatusCode.OK);
        }

        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id) =>
            GetResult(await _baseService.GetByIdAsync(Id));

        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<CityDTO> pagination) =>
            GetResult(await _baseService.GetPageAsync(pagination));

        [AllowAnonymous]
        [HttpGet("dropDownList/{stateId}")]
        public async Task<IActionResult> GetDropdownList(int stateId) =>
            GetResult(await _baseService.GetAllAsync(x => x.StateId == stateId));
    }
}