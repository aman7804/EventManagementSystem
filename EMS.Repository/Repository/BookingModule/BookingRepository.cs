using EMS.Data;
using EMS.Entity.Entity;
using EMS.Repository.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace EMS.Repository.Repository.BookingModule
{
    public class BookingRepository : BaseRepository<BookingEntity>, IBookingRepository
    {
        public BookingRepository(SqlDbContext dbContext ,IHttpContextAccessor contextAccessor)
            : base(dbContext, contextAccessor) { }

        public override async Task AddAsync(BookingEntity entity)
        {
            entity.CustomerId = CurrentUser;
            await base.AddAsync(entity);
        }   
        public override async Task<BookingEntity?> GetAsync(Expression<Func<BookingEntity, bool>> predicate, bool asNoTracking = false)
        {
            IQueryable<BookingEntity> query = GetAll(predicate);
            query = query.Include(p => p.Package)
                             .ThenInclude(v => v.Venue)
                         .Include(p => p.Package)
                             .ThenInclude(p => p.Photography)
                         .Include(p => p.Package)
                             .ThenInclude(v => v.Catering)
                         .Include(p => p.Package)
                             .ThenInclude(p => p.Decoration);
            if (asNoTracking)
                query = query.AsNoTracking();

            return await query.FirstOrDefaultAsync();
        }
    }
}
