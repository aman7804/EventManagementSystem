using EMS.Api.Authorization;
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
    public class CateringController : BaseController
    {
        private readonly ICateringService service;
        public CateringController(ICateringService cateringService, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor) =>
                service = cateringService;

        [HttpPost("save")]
        public async Task<IActionResult> SaveCatering(CateringDTO dto)
        {
            if (dto.Id == 0)
                await service.AddAsync(dto);
            else
                await service.UpdateAsync(dto);
            return GetResult<CateringDTO>(null, HttpStatusCode.OK);
        }

        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteCatering(int Id)
        {
            await service.DeleteAsync(Id);
            return GetResult<CateringDTO>(null, HttpStatusCode.OK);
        }

        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id) =>
            GetResult(await service.GetByIdAsync(Id));

        [AllowAnonymous]
        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<CateringDTO> pagination) =>
            GetResult(await service.GetPageAsync(pagination));
    }
}
