using EMS.Api.Authorization;
using EMS.Entity;
using EMS.Service.BookingModule;
using EMS.Service.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : BaseController<BookingEntity, BookingDTO>
    {
        private readonly IBookingService _bookingService;
        public BookingController(IBookingService bookingService, IHttpContextAccessor httpContextAccessor)
            : base(bookingService, httpContextAccessor) =>
            _bookingService = bookingService;

        [Authorize(Shared.EnumRole.Customer)]
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

        [Authorize(Shared.EnumRole.Customer)]
        [HttpGet("payment/{Id}")]
        public async Task<IActionResult> BookingPaymentDone(int Id)
        {
            BookingDTO dto = await _baseService.GetByIdAsync(Id, true);
            dto.Status = Shared.EnumBookingStatus.Paid;
            await _baseService.UpdateAsync(dto);

            return GetResult<BookingDTO>(null, HttpStatusCode.OK);
        }

        [Authorize(Shared.EnumRole.Admin)]
        [HttpGet("confirmBooking/{Id}")]
        public async Task<IActionResult> ConfirmBooking(int Id)
        {
            BookingDTO dto = await _baseService.GetByIdAsync(Id, true);
            dto.Status = Shared.EnumBookingStatus.Confirmed;
            await _baseService.UpdateAsync(dto);

            return GetResult<BookingDTO>(null, HttpStatusCode.OK);
        }

        [Authorize(Shared.EnumRole.Customer)]
        [HttpGet("cancel/{Id}")]
        public async Task<IActionResult> CancelBooking(int Id)
        {
            BookingDTO dto = await _baseService.GetByIdAsync(Id, true);
            dto.Status = Shared.EnumBookingStatus.Cancelled;
            await _baseService.UpdateAsync(dto);

            return GetResult<BookingDTO>(null, HttpStatusCode.OK);
        }

        [Authorize(Shared.EnumRole.Admin)]
        [HttpGet("reject/{Id}")]
        public async Task<IActionResult> RejectBooking(int Id)
        {
            BookingDTO dto = await _baseService.GetByIdAsync(Id, true);
            dto.Status = Shared.EnumBookingStatus.Rejected;
            await _baseService.UpdateAsync(dto);

            return GetResult<BookingDTO>(null, HttpStatusCode.OK);
        }

        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<BookingDTO> pagination) =>
            GetResult(await _bookingService.GetBookings(pagination));
    }
}
