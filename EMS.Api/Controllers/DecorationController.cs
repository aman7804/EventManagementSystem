using EMS.Api.Authorization;
using EMS.Service.DecorationModule;
using EMS.Service.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class DecorationController : BaseController
    {
        private readonly IDecorationService service;
        public DecorationController(IDecorationService decorationService, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor) {
            service = decorationService;
        }

        [HttpPost("save")]
        public async Task<IActionResult> SaveDecoration(DecorationDTO dto)
        {
            if (dto.Id == 0)
                await service.AddAsync(dto);
             else
                await service.UpdateAsync(dto);
             return GetResult<DecorationDTO>(null, HttpStatusCode.OK);
        }

        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteDecoration(int Id)
        {
            await service.DeleteAsync(Id);
            return GetResult<DecorationDTO>(null, HttpStatusCode.OK);
        }

        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id) =>
            GetResult(await service.GetByIdAsync(Id));

        [AllowAnonymous]
        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<DecorationDTO> pagination) =>
            GetResult(await service.GetPageAsync(pagination));
    }
}
