using AutoMapper;
using EMS.Entity.Entity;
using EMS.Repository.Repository.BookingModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using EMS.Shared.Constant;
using Microsoft.AspNetCore.Http;

namespace EMS.Service.Services.BookingModule
{
    public class BookingService : BaseService<BookingEntity, BookingDTO>, IBookingService
    {
        public BookingService(IMapper mapper, IBookingRepository bookingRepositoty, IHttpContextAccessor contextAccessor)
            : base(mapper, bookingRepositoty, contextAccessor) { }

        public async Task<GetBookingDTO> GetBookingById(int Id)
        {
            if (Id <= 0) throw new ArgumentNullException(nameof(Id), "Id cannot be null");
            BookingEntity? entity = await Repo.GetByIdAsync(Id);
            return entity == null ? throw new Exception(ExceptionMessage.RECORD_NOT_FOUND) : Map<BookingEntity, GetBookingDTO>(entity);
        }
    }
}
