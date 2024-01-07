using AutoMapper;
using EMS.Entity.Entity;
using EMS.Repository.Repository.PackageModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using EMS.Shared;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace EMS.Service.Services.PackageModule
{
    public class PackageService : BaseService<PackageEntity, PackageDTO> ,IPackageService
    {
        private readonly IPackageRepository _packageRepository;
        public PackageService(IMapper mapper, IPackageRepository packageRepository, IHttpContextAccessor contextAccessor) : base(mapper, packageRepository, contextAccessor)
        {
            _packageRepository = packageRepository;
        }

        public async Task<PaginationDTO<PackageItemDTO>> GetPackages(PaginationDTO<PackageItemDTO> paginationDTO)
        {
            IQueryable<PackageEntity> packages = _packageRepository.GetDraftAndPackages();

            paginationDTO.RecordCount = await packages.CountAsync();

            if (!string.IsNullOrWhiteSpace(paginationDTO.SortByColumns))
            {
                if (paginationDTO.SortBy == EnumSortBy.Descending)
                {
                    packages = packages.OrderByDescending(p => EF.Property<PackageEntity>(p, paginationDTO.SortByColumns));
                    // to solve bellow mentioned problem, this solution got from chatGpt;
                    // it's usefull in shadow propery usage scenario.
                    // isn't there any other solution to specify the type of property?
                }
                else
                {
                    packages = packages.OrderBy(paginationDTO.SortByColumns);
                    // we used orderBy like this, have'nt got any problem with it;
                    // i think problem is because, in baseClass we were using orderBy for generic query, here we are using for specific entityType query.
                }
            }

            packages = packages.Skip(paginationDTO.PageSize * (paginationDTO.PageNo - 1));
            packages = packages.Take(paginationDTO.PageSize);

            // dont know how to bring drafts up. should i write logic to put draftPackages up?
            List<PackageEntity> records = await packages.ToListAsync();
            if (records.Count > 0)
            {
                paginationDTO.Data = Map<List<PackageEntity>, List<PackageItemDTO>>(records);
            }

            return paginationDTO;
        }
    }
}