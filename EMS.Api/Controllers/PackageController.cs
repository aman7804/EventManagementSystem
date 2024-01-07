using EMS.Entity.Entity;
using EMS.Service.DTO;
using EMS.Service.Services.PackageModule;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    public class PackageController : BaseController<PackageEntity, PackageDTO>
    {
        private readonly IPackageService _packageService;
        public PackageController(IPackageService packageService ) : base(packageService)
        {
            _packageService = packageService;
        }

        [HttpPost("save")]
        public async Task<IActionResult> SavePackage(PackageDTO dto)
        {
            if (dto.Id == 0)
            {
                await _baseService.AddAsync(dto);
                return GetResult<PackageDTO>(null, HttpStatusCode.OK);
            }
            else
            {
                await _baseService.UpdateAsync(dto);
                return GetResult<PackageDTO>(null, HttpStatusCode.OK);
            }
        }

        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeletePackage(int Id)
        {
            await _baseService.DeleteAsync(Id);
            return GetResult<PackageDTO>(null, HttpStatusCode.OK);
        }

        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id)
        {
            return GetResult<PackageDTO>(await _baseService.GetByIdAsync(Id));
        }

        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<PackageDTO> pagination)
        {

            return GetResult<PaginationDTO<PackageDTO>>(await _baseService.GetPageAsync(pagination));
        }
        
        [HttpPost("explore-packages")]
        public async Task<IActionResult> ExplorePackages(PaginationDTO<PackageItemDTO> pagination)
        {

            return GetResult<PaginationDTO<PackageItemDTO>>(await _packageService.GetPackages(pagination));
        }
    }
}
