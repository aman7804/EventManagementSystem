using EMS.Entity;
using EMS.Service.DTO;
using EMS.Service.PhotographyModule;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotographyController : BaseController<PhotographyEntity, PhotographyDTO>
    {
        public PhotographyController(IPhotographyService photographyService) : base(photographyService) { }

        [HttpPost("save")]
        public async Task<IActionResult> SavePhotography(PhotographyDTO dto)
        {
            if (dto.Id == 0)
                await _baseService.AddAsync(dto);
            else
                await _baseService.UpdateAsync(dto);
            return GetResult<PhotographyDTO>(null, HttpStatusCode.OK);
        }

        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeletePhotography(int Id)
        {
            await _baseService.DeleteAsync(Id);
            return GetResult<PhotographyDTO>(null, HttpStatusCode.OK);
        }

        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id) =>
             GetResult<PhotographyDTO>(await _baseService.GetByIdAsync(Id));

        [HttpPost("list")] 
        public async Task<IActionResult> List(PaginationDTO<PhotographyDTO> pagination) =>
            GetResult<PaginationDTO<PhotographyDTO>>(await _baseService.GetPageAsync(pagination));
    }
}
