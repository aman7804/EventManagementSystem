using AutoMapper;
using EMS.Entity.Entity;
using EMS.Repository.Repository.BookingModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using Microsoft.AspNetCore.Http;

namespace EMS.Service.Services.BookingModule
{
    public class BookingService : BaseService<BookingEntity, BookingDTO>, IBookingService
    {
        public BookingService(IMapper mapper, IBookingRepository bookingRepositoty, IHttpContextAccessor contextAccessor)
            : base(mapper, bookingRepositoty, contextAccessor) { }
    }
}
