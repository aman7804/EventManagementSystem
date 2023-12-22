using EMS.Entity.Base;
using System.Linq.Expressions;

namespace EMS.Repository.Base
{
    public interface IBaseRepository<T> where T : BaseEntity
    {
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(int id);
        Task<T?> GetByIdAsync(int id, bool asNoTracking = false);
        Task<T?> GetAsync(Expression<Func<T, bool>> predicate, bool asNoTracking = false);
        IQueryable<T> GetAll(Expression<Func<T, bool>> predicate);
    }
}