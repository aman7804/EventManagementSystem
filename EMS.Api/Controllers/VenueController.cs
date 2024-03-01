using EMS.Api.Authorization;
using EMS.Service.DTO;
using EMS.Service.DTO.Filter;
using EMS.Service.VenueModule;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class VenueController : BaseController
    {
        private readonly IVenueService service;
        public VenueController(IVenueService venueService, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor) =>
                service = venueService;

        [HttpPost("save")]
        public async Task<IActionResult> SaveVenue(VenueDTO dto)
        {
            if (dto.Id == 0)
                await service.AddAsync(dto);
            else
                await service.UpdateAsync(dto);
            return GetResult<VenueDTO>(null, HttpStatusCode.OK);
        }

        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteVenue(int Id)
        {
            await service.DeleteAsync(Id);
            return GetResult<VenueDTO>(null, HttpStatusCode.OK);
        }

        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id) =>
            GetResult(await service.GetByIdAsync(Id));

        [AllowAnonymous]
        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<VenueDTO, VenueFilter> pagination) =>
            GetResult(await service.GetPageAsync(pagination));

        [HttpGet("drop-down-list")]
        public async Task<IActionResult> GetDropdownList() =>
            GetResult(await service.GetDropDownList());
	}
}
