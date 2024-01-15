using EMS.Entity;
using EMS.Service.Base;
using EMS.Service.DTO;

namespace EMS.Service.PackageModule
{
    public interface IPackageService : IBaseService<PackageEntity, PackageDTO>
    {
        Task<PaginationDTO<PackageItemDTO>> GetPackages(PaginationDTO<PackageItemDTO> paginationDTO, int CurrentUser);
    }
}
