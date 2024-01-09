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

        //[HttpDelete("cancel/{Id}")]
        //public async Task<IActionResult> CancelBooking(int Id)
        //{
        //    await _baseService.DeleteAsync(Id);
        //    return GetResult<BookingDTO>(null, HttpStatusCode.OK);
        //}


        //[HttpPost("list")]
        //public async Task<IActionResult> List(PaginationDTO<BookingDTO> pagination) =>
        //    GetResult<PaginationDTO<BookingDTO>>(await _baseService.GetPageAsync(pagination));
    }
}
