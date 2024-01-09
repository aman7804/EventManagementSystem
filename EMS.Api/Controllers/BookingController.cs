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
        public BookingController(IBookingService bookingService) : base(bookingService) { }

        [HttpPost("save")]
        public async Task<IActionResult> SaveBooking(BookingDTO dto)
        {
            if (dto.Id == 0)
                await _baseService.AddAsync(dto);
            else
                await _baseService.UpdateAsync(dto);
            return GetResult<BookingDTO>(null, HttpStatusCode.OK);
        }

        //[HttpDelete("cancel/{Id}")]
        //public async Task<IActionResult> CancelBooking(int Id)
        //{
        //    await _baseService.DeleteAsync(Id);
        //    return GetResult<BookingDTO>(null, HttpStatusCode.OK);
        //}

        //[HttpGet("index/{Id}")]
        //public async Task<IActionResult> Index(int Id) =>
        //    GetResult<BookingDTO>(await _baseService.GetByIdAsync(Id));

        //[HttpPost("list")]
        //public async Task<IActionResult> List(PaginationDTO<BookingDTO> pagination) =>
        //    GetResult<PaginationDTO<BookingDTO>>(await _baseService.GetPageAsync(pagination));
    }
}
