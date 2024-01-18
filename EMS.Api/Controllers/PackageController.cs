using EMS.Api.Authorization;
using EMS.Service.DTO;
using EMS.Service.PackageModule;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackageController : BaseController
    {
        private readonly IPackageService service;
        public PackageController(IPackageService packageService, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor) =>
            service = packageService;

        [Authorize(Roles = "Admin")]
        [HttpPost("save")]
        public async Task<IActionResult> SavePackage(PackageDTO dto)
        {
            dto.IsDraft = false;
            return await SavePackageInternal(dto);
        }
        
        [Authorize(Roles = "Admin")]
        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeletePackage(int Id)
        {
            await service.DeleteAsync(Id);
            return GetResult<PackageDTO>(null, HttpStatusCode.OK);
        }

        [AllowAnonymous]
        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id) =>
            GetResult(await service.GetByIdAsync(Id));

        [Authorize(Roles = "Admin")]
        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<PackageDTO> pagination) =>
            GetResult(await service.GetPageAsync(pagination));
        
        [AllowAnonymous]
        [HttpPost("explore-packages")]
        public async Task<IActionResult> ExplorePackages(PaginationDTO<PackageItemDTO> pagination) =>
            GetResult(await service.GetPackages(pagination, CurrentUser));

        [Authorize(Roles = "Customer")]
        [HttpPost("save-as-draft")]
        public async Task<IActionResult> SavePackageAsDraft(PackageDTO dto)
        {
            dto.IsDraft = true;
            return await SavePackageInternal(dto);
        }

        [Authorize(Roles = "Customer")]
        [HttpDelete("delete-draft/{Id}")]
        public async Task<IActionResult> DeleteDraft(int Id)
        {
            var isDeleted = await service.DeletePackage(Id, CurrentUser);
            return isDeleted
                ? GetResult<PackageDTO>(null, HttpStatusCode.OK)
                : Unauthorized(new { message = "Unauthorized" });
        }

        private async Task<IActionResult> SavePackageInternal(PackageDTO dto)
        {
            if (dto.Id == 0)
                await service.AddAsync(dto);
            else
                await service.UpdateAsync(dto);
            return GetResult<PackageDTO>(null, HttpStatusCode.OK);
        }
    }
}
