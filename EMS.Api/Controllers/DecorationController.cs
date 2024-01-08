using EMS.Entity.Entity;
using EMS.Service.DTO;
using EMS.Service.Services.DecorationModule;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DecorationController : BaseController<DecorationEntity, DecorationDTO>
    {
        public DecorationController(IDecorationService decorationService) : base(decorationService) { }

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

        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<DecorationDTO> pagination) =>
            GetResult<PaginationDTO<DecorationDTO>>(await _baseService.GetPageAsync(pagination));
    }
}
