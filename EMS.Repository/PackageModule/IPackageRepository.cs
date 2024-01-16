using EMS.Entity;
using EMS.Repository.Base;

namespace EMS.Repository.PackageModule
{
    public interface IPackageRepository : IBaseRepository<PackageEntity>
    {
        Task DeletePackage(PackageEntity entity);
    }
}
