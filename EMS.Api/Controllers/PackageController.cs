using EMS.Api.Authorization;
using EMS.Entity;
using EMS.Service.DTO;
using EMS.Service.PackageModule;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackageController : BaseController<PackageEntity, PackageDTO>
    {
        private readonly IPackageService _packageService;
        public PackageController(IPackageService packageService ) : base(packageService) =>
            _packageService = packageService;

        [Authorize(Shared.EnumRole.Admin)]
        [HttpPost("save")]
        public async Task<IActionResult> SavePackage(PackageDTO dto)
        {
            dto.IsDraft = false;
            return await SavePackageInternal(dto);
        }
        
        [Authorize(Shared.EnumRole.Admin)]
        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeletePackage(int Id)
        {
            await _baseService.DeleteAsync(Id);
            return GetResult<PackageDTO>(null, HttpStatusCode.OK);
        }

        [AllowAnonymous]
        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id) =>
            GetResult(await _baseService.GetByIdAsync(Id));


        [Authorize(Shared.EnumRole.Admin)]
        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<PackageDTO> pagination) =>
            GetResult(await _baseService.GetPageAsync(pagination));
        
        [AllowAnonymous]
        [HttpPost("explore-packages")]
        public async Task<IActionResult> ExplorePackages(PaginationDTO<PackageItemDTO> pagination) =>
            GetResult(await _packageService.GetPackages(pagination));

        [Authorize(Shared.EnumRole.Customer)]
        [HttpPost("save-as-draft")]
        public async Task<IActionResult> SavePackageAsDraft(PackageDTO dto)
        {
            dto.IsDraft = true;
            return await SavePackageInternal(dto);
        }

        private async Task<IActionResult> SavePackageInternal(PackageDTO dto)
        {
            if (dto.Id == 0)
                await _baseService.AddAsync(dto);
            else
                await _baseService.UpdateAsync(dto);
            return GetResult<PackageDTO>(null, HttpStatusCode.OK);
        }
    }
}
