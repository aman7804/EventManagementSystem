using AutoMapper;
using EMS.Service.Base;
using EMS.Service.DTO;
using EMS.Shared;
using Microsoft.EntityFrameworkCore;
using EMS.Service.Extension;
using EMS.Repository.PackageModule;
using EMS.Entity;
using EMS.Shared.Constant;
using EMS.Service.DTO.Filter;
using System.Linq.Expressions;

namespace EMS.Service.PackageModule
{
    public class PackageService : BaseService<PackageEntity, PackageDTO>, IPackageService
    {
        private readonly IPackageRepository _packageRepository;
        public PackageService(IMapper mapper, IPackageRepository packageRepository)
            : base(mapper, packageRepository) => 
            _packageRepository = packageRepository;

        public async Task<PaginationDTO<PackageItemDTO, PackageItemFilter>> GetPackages
            (PaginationDTO<PackageItemDTO, PackageItemFilter> paginationDTO,
            int CurrentUser)   
        {
            IQueryable<PackageEntity> packages = CurrentUser > 0
                            ? packages = 
                                Repo.GetAll( x =>
                                    x.IsDraft == true && x.CreatedBy == CurrentUser
                                    || x.IsDraft == false )
                            : packages = Repo.GetAll(x => x.IsDraft == false);

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

        public override async Task<PaginationDTO<PackageDTO, F>>
            GetPageAsync<F>(PaginationDTO<PackageDTO, F> paginationDTO)
        {
            IQueryable<PackageEntity> packages = Repo.GetAll(x => x.IsDraft == false);
            packages = packages.Include(v => v.Venue)
                               .Include(p => p.Photography)
                               .Include(d => d.Decoration)
                               .Include(c => c.Catering);

            //Apply condition for each filter
            Expression<Func<PackageDTO, bool>> expression = paginationDTO.Filter.GetFilter();
            Expression<Func<PackageEntity, bool>> where = Map<Expression<Func<PackageDTO, bool>>, Expression<Func<PackageEntity, bool>>>(expression);
            packages = packages.Where(where);

            paginationDTO.RecordCount = await packages.CountAsync();
            paginationDTO.PageCount = (int)Math.Ceiling(
                (double)paginationDTO.RecordCount / paginationDTO.PageSize
            );

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
                paginationDTO.Data = Map<List<PackageEntity>, List<PackageDTO>>(records);

            return paginationDTO;
        }

        public async Task<bool> DeletePackage(int Id, int CurrentUser)
        {
            var package = await Repo.GetByIdAsync(Id) ?? throw new Exception(ExceptionMessage.RECORD_NOT_FOUND);
            if (package.CreatedBy != CurrentUser || !package.IsDraft)
                return false;   
            await _packageRepository.DeletePackage(package);
            return true;
        }

        public async Task<PackageFullDTO> GetPackageByIdAsync(int Id){            
            if (Id <= 0) throw new ArgumentNullException(nameof(Id), "Id cannot be null");

            IQueryable<PackageEntity>? packageEntityQry = Repo.GetAll(x => x.Id == Id)
                .Include(v => v.Venue)
                .Include(p => p.Photography)
                .Include(d => d.Decoration)
                .Include(c => c.Catering);           
            PackageEntity? packageEntity = await packageEntityQry.FirstOrDefaultAsync();
            
            return packageEntity == null
                ? throw new Exception(ExceptionMessage.RECORD_NOT_FOUND)
                : Map<PackageEntity, PackageFullDTO>(packageEntity);
        }
    }
}