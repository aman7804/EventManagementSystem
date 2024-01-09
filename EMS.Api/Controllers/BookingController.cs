using EMS.Entity.Entity;
using EMS.Service.DTO;
using EMS.Service.Services.BookingModule;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : BaseController<BookingEntity, BookingDTO>
    {
        private readonly IBookingService _bookingService;
        public BookingController(IBookingService bookingService) : base(bookingService) =>
            _bookingService = bookingService;

        [HttpPost("save")]
        public async Task<IActionResult> SaveBooking(BookingDTO dto)
        {
            dto.Status = Shared.EnumBookingStatus.Pending;
            if (dto.Id == 0)
                await _baseService.AddAsync(dto);
            else
                await _baseService.UpdateAsync(dto);
            return GetResult<BookingDTO>(null, HttpStatusCode.OK);
        }

        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id) =>
            GetResult<GetBookingDTO>(await _bookingService.GetBookingById(Id));

        [HttpGet("payment/{Id}")]
        public async Task<IActionResult> BookingPaymentDone(int Id)
        {
            BookingDTO dto = await _baseService.GetByIdAsync(Id);
            dto.Status = Shared.EnumBookingStatus.Paid;
            await _baseService.UpdateAsync(dto);

            return GetResult<BookingDTO>(null, HttpStatusCode.OK);
        }

        [HttpGet("confirmBooking/{Id}")]
        public async Task<IActionResult> ConfirmBooking(int Id)
        {
            BookingDTO dto = await _baseService.GetByIdAsync(Id);
            dto.Status = Shared.EnumBookingStatus.Confirmed;
            await _baseService.UpdateAsync(dto);

            return GetResult<BookingDTO>(null, HttpStatusCode.OK);
        }


        [HttpGet("cancel/{Id}")]
        public async Task<IActionResult> CancelBooking(int Id)
        {
            BookingDTO dto = await _baseService.GetByIdAsync(Id);
            dto.Status = Shared.EnumBookingStatus.Cancelled;
            await _baseService.UpdateAsync(dto);

            return GetResult<BookingDTO>(null, HttpStatusCode.OK);
        }
        [HttpGet("reject/{Id}")]
        public async Task<IActionResult> RejectBooking(int Id)
        {
            BookingDTO dto = await _baseService.GetByIdAsync(Id);
            dto.Status = Shared.EnumBookingStatus.Rejected;
            await _baseService.UpdateAsync(dto);

            return GetResult<BookingDTO>(null, HttpStatusCode.OK);
        }

        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<BookingDTO> pagination) =>
            GetResult<PaginationDTO<BookingDTO>>(await _bookingService.GetBookings(pagination));
    }
}
