using EMS.Entity.Base;
using EMS.Service.DTO;
using System.Linq.Expressions;

namespace EMS.Service.Base
{
    public interface IBaseService<T, D> where T : BaseEntity where D : BaseDTO
    {
        Task AddAsync(D dto);
        Task DeleteAsync(int Id);
        Task UpdateAsync(D dto);

        Task<D> GetByIdAsync(int Id, bool asNoTracking = false);
        Task<List<D>> GetAllAsync(Expression<Func<D, bool>>? expression);
        Task<PaginationDTO<D, F>>GetPageAsync<F>
            (PaginationDTO<D, F> paginationDTO) where F : FilterBase<D>;
        T2 Map<T1, T2>(T1 obj);
    }
}
