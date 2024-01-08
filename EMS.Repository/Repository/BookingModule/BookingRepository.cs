using EMS.Data;
using EMS.Entity.Entity;
using EMS.Repository.Base;
using Microsoft.AspNetCore.Http;

namespace EMS.Repository.Repository.BookingModule
{
    public class BookingRepository : BaseRepository<BookingEntity>, IBookingRepository
    {
        public BookingRepository(SqlDbContext dbContext ,IHttpContextAccessor contextAccessor)
            : base(dbContext, contextAccessor) { }
    }
}
