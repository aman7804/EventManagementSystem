using EMS.Api.Authorization;
using EMS.Service.BookingModule;
using EMS.Service.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : BaseController
    {
        private readonly IBookingService service;
        public BookingController(IBookingService bookingService, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor) =>
            service = bookingService;

        [Authorize(Roles = "Customer")]
        [HttpPost("save")]
        public async Task<IActionResult> SaveBooking(BookingDTO dto)
        {
            dto.Status = Shared.EnumBookingStatus.Pending;
            if (dto.Id == 0)
                await service.AddAsync(dto);
            else
                await service.UpdateAsync(dto);
            return GetResult<BookingDTO>(null, HttpStatusCode.OK);
        }

        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id) =>
            GetResult(await service.GetBookingById(Id));

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteBooking(int Id)
        {
            await service.DeleteAsync(Id);
            return GetResult<BookingDTO>(null, HttpStatusCode.OK);
        }

        [Authorize(Roles = "Customer")]
        [HttpGet("payment/{Id}")]
        public async Task<IActionResult> BookingPaymentDone(int Id)
        {
            BookingDTO dto = await service.GetByIdAsync(Id, true);
            dto.Status = Shared.EnumBookingStatus.Paid;
            await service.UpdateAsync(dto);

            return GetResult<BookingDTO>(null, HttpStatusCode.OK);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("confirmBooking/{Id}")]
        public async Task<IActionResult> ConfirmBooking(int Id)
        {
            BookingDTO dto = await service.GetByIdAsync(Id, true);
            dto.Status = Shared.EnumBookingStatus.Confirmed;
            await service.UpdateAsync(dto);

            return GetResult<BookingDTO>(null, HttpStatusCode.OK);
        }

        [Authorize(Roles = "Customer")]
        [HttpGet("cancel/{Id}")]
        public async Task<IActionResult> CancelBooking(int Id)
        {
            BookingDTO dto = await service.GetByIdAsync(Id, true);
            dto.Status = Shared.EnumBookingStatus.Cancelled;
            await service.UpdateAsync(dto);

            return GetResult<BookingDTO>(null, HttpStatusCode.OK);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("reject/{Id}")]
        public async Task<IActionResult> RejectBooking(int Id)
        {
            BookingDTO dto = await service.GetByIdAsync(Id, true);
            dto.Status = Shared.EnumBookingStatus.Rejected;
            await service.UpdateAsync(dto);

            return GetResult<BookingDTO>(null, HttpStatusCode.OK);
        }

        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<BookingDTO> pagination) =>
            GetResult(await service.GetBookings(pagination));
    }
}
