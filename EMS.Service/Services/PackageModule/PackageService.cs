using AutoMapper;
using EMS.Entity.Entity;
using EMS.Repository.Repository.PackageModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace EMS.Service.Services.PackageModule
{
    public class PackageService : BaseService<PackageEntity, PackageDTO> ,IPackageService
    {
        public PackageService(IMapper mapper, IPackageRepository packageRepository, IHttpContextAccessor contextAccessor) : base(mapper, packageRepository, contextAccessor) { }

        public List<PackageItemDTO> GetPackages()
        {
            IQueryable<PackageEntity> packages = Repo.GetAll(x => ((x.IsDraft == true && x.CreatedBy == CurrentUser) && x.IsDraft == false) || (x.IsDraft == false));

            packages = packages.Include(v => v.Venue)
                               .Include(p => p.Photography)
                               .Include(d => d.Decoration)
                               .Include(c => c.Catering);

            return Map<List<PackageEntity>, List<PackageItemDTO>>(packages.ToList());
        }
    }
}