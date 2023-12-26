using EMS.Entity;
using EMS.Entity.Entity;
using EMS.Service.DTO;
using EMS.Service.Services.CityModule;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : BaseController<CityEntity, CityDTO>
    {
        public CityController(ICityService cityService) : base(cityService) { }

        [HttpPost("save")]
        public async Task<IActionResult> SaveCity(CityDTO dto)
        {
            if (dto.Id == 0)
            {
                await _baseService.AddAsync(dto);
                return GetResult<CityDTO>(null, HttpStatusCode.OK);
            }
            else
            {
                await _baseService.UpdateAsync(dto);
                return GetResult<CityDTO>(null, HttpStatusCode.OK);
            }
        }
    
        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteCity(int Id)
        {
            await _baseService.DeleteAsync(Id);
            return GetResult<CityDTO>(null, HttpStatusCode.OK);
        }

        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id)
        {
            return GetResult<CityDTO>(await _baseService.GetByIdAsync(Id));
        }

        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<CityDTO> pagination)
        {

            return GetResult<PaginationDTO<CityDTO>>(await _baseService.GetPageAsync(pagination));
        }

        [HttpGet("dropDownList/{stateId}")]
        public async Task<IActionResult> GetDropdownList(int stateId)
        {
            return GetResult<List<CityDTO>>(await _baseService.GetAllAsync(x => x.StateId == stateId));
        }
    }
}