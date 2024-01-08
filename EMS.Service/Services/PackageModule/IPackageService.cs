using EMS.Entity.Entity;
using EMS.Service.Base;
using EMS.Service.DTO;

namespace EMS.Service.Services.PackageModule
{
    public interface IPackageService : IBaseService<PackageEntity, PackageDTO>
    {
        Task<PaginationDTO<PackageItemDTO>> GetPackages(PaginationDTO<PackageItemDTO> paginationDTO);
    }
}
