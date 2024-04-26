using EMS.Entity;
using EMS.Service.DTO;
using System.Linq.Expressions;

namespace EMS.Service.Base
{
    public interface IBaseService<T, D> where T : BaseEntity where D : BaseDTO
    {
        Task AddAsync(D dto);
        Task DeleteAsync(int Id);
        Task UpdateAsync(D dto);

        Task<D> GetByIdAsync(int Id);
        Task<List<D>> GetAllAsync(Expression<Func<D, bool>> expression);
        Task<PaginationDTO<D>> GetPageAsync(PaginationDTO<D> paginationDTO);
        T2 Map<T1, T2>(T1 obj);
    }
}
