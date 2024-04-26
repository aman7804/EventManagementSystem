using AutoMapper;
using EMS.Entity;
using EMS.Repository.Base;
using EMS.Service.DTO;
using EMS.Shared.Constant;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

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
        public async Task AddAsync(D dto)
        {
            T entity = ToEntity(dto);
            await Repo.AddAsync(entity);
        }

        public async Task DeleteAsync(int Id)
        {
            await Repo.DeleteAsync(Id);
        }

        public async Task<List<D>> GetAllAsync(Expression<Func<D, bool>> expression)
        {
            Expression<Func<T, bool>> predicate = Map<Expression<Func<D, bool>>, Expression<Func<T, bool>>>(expression);
            List<T> list = await Repo.GetAll(predicate).AsNoTracking().ToListAsync();
            return Map<List<T>, List<D>>(list);
        }

        public async Task<D> GetByIdAsync(int Id)
        {
            T? entity = await Repo.GetByIdAsync(Id);
            if (entity == null)
            {
                throw new Exception(ExceptionMessage.RECORD_NOT_FOUND);
            }
            return ToDTO(entity);
        }

        public async Task<PaginationDTO<D>> GetPageAsync(PaginationDTO<D> paginationDTO)
        {            
            Expression<Func<D, bool>> expression = paginationDTO.FilterDTO.GetFilter();
            Expression<Func<T, bool>> where = Map<Expression<Func<D, bool>>, Expression<Func<T, bool>>>(expression);
            IQueryable<T> query = Repo.GetAll(where);

            paginationDTO.RecordCount = await query.CountAsync();

            query.Skip(paginationDTO.PageSize * (paginationDTO.PageNo - 1));
            query.Take(paginationDTO.PageSize);

            List<T> records = await query.ToListAsync();
            if (records.Count > 0)
            {
                paginationDTO.Data = Map<List<T>, List<D>>(records);
            } else if(paginationDTO.RecordCount > 0 && paginationDTO.PageNo > 1)
            {
                paginationDTO.PageNo -= 1;
            }
            return paginationDTO;
        }

        public async Task UpdateAsync(D dto)
        {
            T entity = ToEntity(dto);
            await Repo.UpdateAsync(entity);
        }

        #region Protected Methods
        protected virtual D ToDTO(T entity)
        {
            return Mapper.Map<D>(entity);
        }
        protected virtual T ToEntity(D dto)
        {
            return Mapper.Map<T>(dto);
        }
        public virtual T2 Map<T1, T2>(T1 obj)
        {
            return Mapper.Map<T2>(obj);
        }        
        #endregion
    }
}
