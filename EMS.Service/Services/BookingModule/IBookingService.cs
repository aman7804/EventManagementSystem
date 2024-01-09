using EMS.Entity.Entity;
using EMS.Service.Base;
using EMS.Service.DTO;

namespace EMS.Service.Services.BookingModule
{
    public interface IBookingService : IBaseService<BookingEntity, BookingDTO>
    {
        Task<GetBookingDTO> GetBookingById(int Id);
        Task<PaginationDTO<BookingDTO>> GetBookings(PaginationDTO<BookingDTO> paginationDTO);
    }
}
