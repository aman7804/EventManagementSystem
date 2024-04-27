using EMS.Entity;
using EMS.Service.Base;
using EMS.Service.DTO;
using EMS.Service.DTO.Booking;
using EMS.Service.DTO.Filter;
using EMS.Shared;

namespace EMS.Service.BookingModule
{
    public interface IBookingService : IBaseService<BookingEntity, SaveBookingDTO>
    {
        Task<GetBookingDTO> GetBookingById(int Id);
        Task<PaginationDTO<BookingDTO, BookingFilter>>
            GetBookings(PaginationDTO<BookingDTO, BookingFilter> paginationDTO);
        Task<BookingSummaryDTO> GetBookingSummary();
        Task<BookingRevenueDTO> GetBookingRevenue();
        Task<BookingReportDTO> GetBookingReport(EnumBookingReportType enumBookingReportType);    
    }
}
