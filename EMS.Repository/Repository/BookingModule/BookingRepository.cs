using EMS.Data;
using EMS.Entity.Entity;
using EMS.Repository.Base;
using EMS.Shared;
using EMS.Shared.Constant;
using Microsoft.AspNetCore.Http;

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
        
    }
}
