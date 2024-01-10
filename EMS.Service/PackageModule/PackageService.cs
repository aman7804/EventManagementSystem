using AutoMapper;
using EMS.Service.Base;
using EMS.Service.DTO;
using EMS.Shared;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using EMS.Service.Extension;
using EMS.Repository.PackageModule;
using EMS.Entity;

namespace EMS.Service.PackageModule
{
    public class PackageService : BaseService<PackageEntity, PackageDTO>, IPackageService
    {
        public PackageService(IMapper mapper, IPackageRepository packageRepository) : base(mapper, packageRepository) { }

        public async Task<PaginationDTO<PackageItemDTO>> GetPackages(PaginationDTO<PackageItemDTO> paginationDTO)
        {
            IQueryable<PackageEntity> packages = Repo.GetAll(x =>
                x.IsDraft == true && x.CreatedBy == 1 || x.IsDraft == false);
            packages = packages.Include(v => v.Venue)
                               .Include(p => p.Photography)
                               .Include(d => d.Decoration)
                               .Include(c => c.Catering);

            //Apply condition for each filter

            paginationDTO.RecordCount = await packages.CountAsync();

            if (!string.IsNullOrWhiteSpace(paginationDTO.SortByColumns))
            {
                if (paginationDTO.SortBy == EnumSortBy.Descending)
                    packages = packages.OrderByDescending(paginationDTO.SortByColumns);
                else
                    packages = packages.OrderBy(paginationDTO.SortByColumns);
            }

            packages = packages.Skip(paginationDTO.PageSize * (paginationDTO.PageNo - 1));
            packages = packages.Take(paginationDTO.PageSize);

            List<PackageEntity> records = await packages.ToListAsync();
            if (records.Count > 0)
                paginationDTO.Data = Map<List<PackageEntity>, List<PackageItemDTO>>(records);

            return paginationDTO;
        }
    }
}