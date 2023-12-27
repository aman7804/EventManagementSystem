using EMS.Entity.Entity;
using EMS.Service.DTO;
using EMS.Service.Services.CateringModule;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CateringController : BaseController<CateringEntity, CateringDTO>
    {

        public CateringController(ICateringService cateringService) : base(cateringService) { }

        [HttpPost("save")]
        public async Task<IActionResult> SaveCatering(CateringDTO dto)
        {
            if (dto.Id == 0)
            {
                await _baseService.AddAsync(dto);
                return GetResult<CateringDTO>(null, HttpStatusCode.OK);
            }
            else
            {
                await _baseService.UpdateAsync(dto);
                return GetResult<CateringDTO>(null, HttpStatusCode.OK);
            }
        }

        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteCatering(int Id)
        {
            await _baseService.DeleteAsync(Id);
            return GetResult<CateringDTO>(null, HttpStatusCode.OK);
        }

        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id)
        {
            return GetResult<CateringDTO>(await _baseService.GetByIdAsync(Id));
        }

        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<CateringDTO> pagination)
        {

            return GetResult<PaginationDTO<CateringDTO>>(await _baseService.GetPageAsync(pagination));
        }
    }
}
