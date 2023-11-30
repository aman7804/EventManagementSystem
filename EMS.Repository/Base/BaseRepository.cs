using EMS.Data;
using EMS.Entity;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using EMS.Shared.Constant;
using Microsoft.AspNetCore.Http;

namespace EMS.Repository.Base
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        public readonly SqlDbContext Context;

        public readonly int CurrentUser;
        public BaseRepository(SqlDbContext sqlDbContext, IHttpContextAccessor httpContextAccessor)
        {
            Context = sqlDbContext;

            string? userId = httpContextAccessor.HttpContext?.User?.Identity?.Name;

            if (!string.IsNullOrWhiteSpace(userId))
            {
                CurrentUser = Convert.ToInt32(userId);
            }
        }

        public virtual async Task AddAsync(T entity)
        {
            entity.CreateDate = DateTime.Now;
            entity.CreatedBy = CurrentUser;
            Context.Add(entity);
            await Context.SaveChangesAsync();
        }

        public virtual async Task DeleteAsync(int id)
        {
            T? entity = await GetByIdAsync(id);
            if (entity == null)
            {
                throw new Exception(ExceptionMessage.RECORD_NOT_FOUND);
            }
            Context.Remove(entity);
            await Context.SaveChangesAsync();
        }

        public virtual IQueryable<T> GetAll(Expression<Func<T, bool>> predicate)
        {
            IQueryable<T> query = Context.Set<T>().AsQueryable<T>();
            if (predicate != null)
            {
                query.Where(predicate);
            }
            return query;
        }

        public virtual async Task<T?> GetAsync(Expression<Func<T, bool>> predicate, bool asNoTracking = false)
        {
            IQueryable<T> query = GetAll(predicate);
            if (asNoTracking)
            {
                query.AsNoTracking();
            }
            
            return await query.FirstOrDefaultAsync();
        }

        public virtual async Task<T?> GetByIdAsync(int id, bool asNoTracking = false)
        {
            return await GetAsync(x => x.Id == id, asNoTracking);
        }

        public virtual async Task UpdateAsync(T entity)
        {
            entity.UpdateDate = DateTime.Now;
            entity.UpdatedBy = CurrentUser;
            Context.Update(entity);
            await Context.SaveChangesAsync();
        }
    }
}
