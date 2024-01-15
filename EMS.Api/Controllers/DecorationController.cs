using EMS.Api.Authorization;
using EMS.Entity;
using EMS.Service.DecorationModule;
using EMS.Service.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Authorize(Shared.EnumRole.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class DecorationController : BaseController<DecorationEntity, DecorationDTO>
    {
        public DecorationController(IDecorationService decorationService, IHttpContextAccessor httpContextAccessor) : base(decorationService, httpContextAccessor) { }

        [HttpPost("save")]
        public async Task<IActionResult> SaveDecoration(DecorationDTO dto)
        {
            if (dto.Id == 0)
                await _baseService.AddAsync(dto);
             else
                await _baseService.UpdateAsync(dto);
             return GetResult<DecorationDTO>(null, HttpStatusCode.OK);
        }

        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteDecoration(int Id)
        {
            await _baseService.DeleteAsync(Id);
            return GetResult<DecorationDTO>(null, HttpStatusCode.OK);
        }

        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id) =>
            GetResult<DecorationDTO>(await _baseService.GetByIdAsync(Id));

        [AllowAnonymous]
        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<DecorationDTO> pagination) =>
            GetResult<PaginationDTO<DecorationDTO>>(await _baseService.GetPageAsync(pagination));
    }
}
