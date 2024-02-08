using AutoMapper;
using EMS.Entity.Base;
using EMS.Repository.Base;
using EMS.Service.DTO;
using EMS.Shared;
using EMS.Shared.Constant;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using EMS.Service.Extension;

namespace EMS.Service.Base
{
    public class BaseService<T, D> : IBaseService<T, D> where T : BaseEntity where D : BaseDTO
    {
        public readonly IMapper Mapper;
        public readonly IBaseRepository<T> Repo;
        public BaseService(IMapper mapper, IBaseRepository<T> baseRepository)
        {
            Mapper = mapper;
            Repo = baseRepository;
        }

        public virtual async Task AddAsync(D dto)
        {
            if (dto == null) throw new ArgumentNullException(nameof(dto), "DTO cannot be null");
            T entity = ToEntity(dto);
            await Repo.AddAsync(entity);
        }
        public virtual async Task UpdateAsync(D dto)
        {
            if (dto == null) throw new ArgumentNullException(nameof(dto), "DTO cannot be null");
            T entity = ToEntity(dto);   
            await Repo.UpdateAsync(entity);
        }

        public async Task DeleteAsync(int Id)
        {
            if (Id <= 0) throw new ArgumentNullException(nameof(Id), "Id cannot be null");
            await Repo.DeleteAsync(Id);
        }

        public async Task<List<D>> GetAllAsync(Expression<Func<D, bool>>? expression)
        {
            Expression<Func<T, bool>>? predicate = expression == null
                ? null
                : Map<Expression<Func<D, bool>>, Expression<Func<T, bool>>>(expression);
            List<T> list = await Repo.GetAll(predicate).AsNoTracking().ToListAsync();
            return Map<List<T>, List<D>>(list);            
        }

        public virtual async Task<D> GetByIdAsync(int Id, bool asNoTracking = false)
        {
            if (Id <= 0) throw new ArgumentNullException(nameof(Id), "Id cannot be null");
            T? entity = await Repo.GetByIdAsync(Id, asNoTracking);
            return entity == null ? throw new Exception(ExceptionMessage.RECORD_NOT_FOUND) : ToDTO(entity);
        }

        public virtual async Task<PaginationDTO<D>> GetPageAsync(PaginationDTO<D> paginationDTO)
        {            
            //Expression<Func<D, bool>> expression = paginationDTO.FilterDTO.GetFilter();
            //Expression<Func<T, bool>> where = Map<Expression<Func<D, bool>>, Expression<Func<T, bool>>>(expression);
            IQueryable<T> query = Repo.GetAll(null);

            paginationDTO.RecordCount = await query.CountAsync();
            paginationDTO.PageCount = (int)Math.Ceiling(
                (double)paginationDTO.RecordCount / paginationDTO.PageSize
            );

            if (!string.IsNullOrWhiteSpace(paginationDTO.SortByColumns))
                if (paginationDTO.SortBy == EnumSortBy.Descending)
                    query = query.OrderByDescending(paginationDTO.SortByColumns);
                else
                    query = query.OrderBy(paginationDTO.SortByColumns);

            query = query.Skip(paginationDTO.PageSize * (paginationDTO.PageNo - 1));
            query = query.Take(paginationDTO.PageSize);

            List<T> records = await query.ToListAsync();
            if (records.Count > 0)
                paginationDTO.Data = Map<List<T>, List<D>>(records);

            return paginationDTO;
        }


        #region Protected Methods
        protected virtual D ToDTO(T entity) => Mapper.Map<D>(entity);
        protected virtual T ToEntity(D dto) => Mapper.Map<T>(dto);
        public virtual T2 Map<T1, T2>(T1 obj) => Mapper.Map<T2>(obj);
        #endregion
    }
}
