using EMS.Entity;
using EMS.Service.CateringModule;
using EMS.Service.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class CateringController : BaseController<CateringEntity, CateringDTO>
    {
        public CateringController(ICateringService cateringService, IHttpContextAccessor httpContextAccessor)
            : base(cateringService, httpContextAccessor) { }

        [HttpPost("save")]
        public async Task<IActionResult> SaveCatering(CateringDTO dto)
        {
            if (dto.Id == 0)
                await _baseService.AddAsync(dto);
            else
                await _baseService.UpdateAsync(dto);
            return GetResult<CateringDTO>(null, HttpStatusCode.OK);
        }

        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteCatering(int Id)
        {
            await _baseService.DeleteAsync(Id);
            return GetResult<CateringDTO>(null, HttpStatusCode.OK);
        }

        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id) =>
            GetResult(await _baseService.GetByIdAsync(Id));

        [AllowAnonymous]
        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<CateringDTO> pagination) =>
            GetResult(await _baseService.GetPageAsync(pagination));
    }
}
