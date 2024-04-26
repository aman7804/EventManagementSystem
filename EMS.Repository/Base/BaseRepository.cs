using EMS.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using EMS.Shared.Constant;
using Microsoft.AspNetCore.Http;
using EMS.Entity.Base;
using System.IdentityModel.Tokens.Jwt;

namespace EMS.Repository.Base
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        public readonly SqlDbContext Context;
        public readonly int CurrentUser;
        public BaseRepository(SqlDbContext sqlDbContext, IHttpContextAccessor httpContextAccessor)
        {
            Context = sqlDbContext;
            var userIdClaim = httpContextAccessor.HttpContext?.User?.FindFirst(JwtRegisteredClaimNames.Name);

            CurrentUser = userIdClaim?.Value != null
                ? Convert.ToInt32(userIdClaim.Value) : 0;
        }

        public virtual async Task AddAsync(T entity)
        {
            entity.CreateDate = DateTime.Now;
            entity.CreatedBy = CurrentUser;
            Context.Add(entity);
            await Context.SaveChangesAsync();
        }
        public virtual async Task UpdateAsync(T entity)
        {
            entity.UpdateDate = DateTime.Now;
            entity.UpdatedBy = CurrentUser;
            Context.Update(entity);
            await Context.SaveChangesAsync();
        }

        public virtual async Task DeleteAsync(int id)
        {
            T? entity = await GetByIdAsync(id) ?? throw new Exception(ExceptionMessage.RECORD_NOT_FOUND);
            Context.Remove(entity);
            await Context.SaveChangesAsync();
        }

        public virtual IQueryable<T> GetAll(Expression<Func<T, bool>>? predicate)
        {
            IQueryable<T> query = Context.Set<T>().AsQueryable<T>();
            if (predicate != null)
                query = query.Where(predicate);
            
            return query;
        }

        public virtual async Task<T?> GetAsync(Expression<Func<T, bool>> predicate, bool asNoTracking = false)
        {
            IQueryable<T> query = GetAll(predicate);
            if (asNoTracking)
                query = query.AsNoTracking();
            
            return await query.FirstOrDefaultAsync();
        }

        public virtual async Task<T?> GetByIdAsync(int id, bool asNoTracking = false) =>
            await GetAsync(x => x.Id == id, asNoTracking);

    }
}
