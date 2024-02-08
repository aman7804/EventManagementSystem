using EMS.Api.Authorization;
using EMS.Service.DTO;
using EMS.Service.DTO.Filter;
using EMS.Service.PhotographyModule;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class PhotographyController : BaseController
    {
        private readonly IPhotographyService service;
        public PhotographyController(IPhotographyService photographyService, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor) => 
                service = photographyService;

        [HttpPost("save")]
        public async Task<IActionResult> SavePhotography(PhotographyDTO dto)
        {
            if (dto.Id == 0)
                await service.AddAsync(dto);
            else
                await service.UpdateAsync(dto);
            return GetResult<PhotographyDTO>(null, HttpStatusCode.OK);
        }

        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeletePhotography(int Id)
        {
            await service.DeleteAsync(Id);
            return GetResult<PhotographyDTO>(null, HttpStatusCode.OK);
        }

        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id) =>
             GetResult(await service.GetByIdAsync(Id));

        [AllowAnonymous]
        [HttpPost("list")] 
        public async Task<IActionResult> List(PaginationDTO<PhotographyDTO, PhotographyFilter> pagination) =>
            GetResult(await service.GetPageAsync(pagination));
    }
}
