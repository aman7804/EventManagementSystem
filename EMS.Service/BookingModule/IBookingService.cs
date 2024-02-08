using EMS.Entity;
using EMS.Service.Base;
using EMS.Service.DTO;
using EMS.Service.DTO.Filter;

namespace EMS.Service.BookingModule
{
    public interface IBookingService : IBaseService<BookingEntity, BookingDTO>
    {
        Task<GetBookingDTO> GetBookingById(int Id);
        Task<PaginationDTO<BookingDTO, BookingFilter>> GetBookings(PaginationDTO<BookingDTO, BookingFilter> paginationDTO);
    }
}
