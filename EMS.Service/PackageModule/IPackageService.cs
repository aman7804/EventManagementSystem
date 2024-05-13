using EMS.Entity;
using EMS.Service.Base;
using EMS.Service.DTO;
using EMS.Service.DTO.Filter;

namespace EMS.Service.PackageModule
{
    public interface IPackageService : IBaseService<PackageEntity, PackageDTO>
    {
        Task<PaginationDTO<PackageItemDTO, PackageItemFilter>> GetPackages
            (PaginationDTO<PackageItemDTO, PackageItemFilter> paginationDTO, int CurrentUser);
        Task<bool> DeletePackage(int Id, int CurrentUser);
        Task<PackageFullDTO> GetPackageByIdAsync(int Id);
    }
}
