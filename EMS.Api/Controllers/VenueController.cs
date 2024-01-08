using EMS.Entity;
using EMS.Service.DTO;
using EMS.Service.Services.VenueModule;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VenueController : BaseController<VenueEntity, VenueDTO>
    {
        public VenueController(IVenueService venueService) : base(venueService) { }

        [HttpPost("save")]
        public async Task<IActionResult> SaveVenue(VenueDTO dto)
        {
            if (dto.Id == 0)
                await _baseService.AddAsync(dto);
            else
                await _baseService.UpdateAsync(dto);
            return GetResult<VenueDTO>(null, HttpStatusCode.OK);
        }

        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteVenue(int Id)
        {
            await _baseService.DeleteAsync(Id);
            return GetResult<VenueDTO>(null, HttpStatusCode.OK);
        }

        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id) =>
            GetResult<VenueDTO>(await _baseService.GetByIdAsync(Id));

        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<VenueDTO> pagination) =>
            GetResult<PaginationDTO<VenueDTO>>(await _baseService.GetPageAsync(pagination));
    }
}
