using EMS.Data;
using EMS.Entity.Base;
using EMS.Shared.Constant;
using Microsoft.AspNetCore.Http;

namespace EMS.Repository.Base
{
    public abstract class SoftDeleteBaseRepository<T> : BaseRepository<T>, ISoftDeleteBaseRepository<T> where T : SoftDeleteBaseEntity
    {
        public SoftDeleteBaseRepository(SqlDbContext sqlDbContext, IHttpContextAccessor httpContextAccessor) 
            : base(sqlDbContext, httpContextAccessor)
        { }

        public override async Task DeleteAsync(int id)
        {
            T? entity = await GetByIdAsync(id);

            if (entity == null)
            {
                throw new Exception(ExceptionMessage.RECORD_NOT_FOUND);
            }
            entity.UpdateDate = DateTime.Now;
            entity.DeletedBy = CurrentUser;
            entity.IsDeleted = true;

            Context.Update(entity);

            await Context.SaveChangesAsync();
        }

    }
}
