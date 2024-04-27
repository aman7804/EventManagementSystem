using AutoMapper;
using EMS.Service.Base;
using EMS.Service.DTO;
using EMS.Shared;
using EMS.Shared.Constant;
using Microsoft.EntityFrameworkCore;
using EMS.Service.Extension;
using EMS.Repository.BookingModule;
using EMS.Entity;
using EMS.Service.DTO.Filter;
using System.Linq.Expressions;
using EMS.Service.DTO.Booking;

namespace EMS.Service.BookingModule
{
    public class BookingService : BaseService<BookingEntity, SaveBookingDTO>, IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        public BookingService(IMapper mapper, IBookingRepository bookingRepositoty)
            : base(mapper, bookingRepositoty) =>
            _bookingRepository = bookingRepositoty;

        public async Task<GetBookingDTO> GetBookingById(int Id)
        {
            if (Id <= 0) throw new ArgumentNullException(nameof(Id), "Id cannot be null");
            BookingEntity? entity = await Repo.GetByIdAsync(Id);
            return entity == null
                ? throw new Exception(ExceptionMessage.RECORD_NOT_FOUND)
                : Map<BookingEntity, GetBookingDTO>(entity);
        }

        public async Task<PaginationDTO<BookingDTO, BookingFilter>>
            GetBookings(PaginationDTO<BookingDTO, BookingFilter> paginationDTO)
        {
            Expression<Func<BookingDTO, bool>> expression = paginationDTO.Filter.GetFilter();
            Expression<Func<BookingEntity, bool>> where =
                Map<Expression<Func<BookingDTO, bool>>, Expression<Func<BookingEntity, bool>>>
                (expression);
            IQueryable<BookingEntity> bookings = _bookingRepository.GetAll(where)
                .Include(p => p.Package)
                // for searching purpose
                    .ThenInclude(v => v.Venue)
                .Include(p => p.Package)
                    .ThenInclude(p => p.Photography)
                .Include(p => p.Package)
                    .ThenInclude(v => v.Catering)
                .Include(p => p.Package)
                    .ThenInclude(p => p.Decoration)
                .Include(u => u.Customer);

			//Apply condition for each filter

			paginationDTO.RecordCount = await bookings.CountAsync();
			paginationDTO.PageCount = (int)Math.Ceiling(
				(double)paginationDTO.RecordCount / paginationDTO.PageSize
			);

			if (!string.IsNullOrWhiteSpace(paginationDTO.SortByColumns))
            {
                if (paginationDTO.SortBy == EnumSortBy.Descending)
                    bookings = bookings.OrderByDescending(paginationDTO.SortByColumns);
                else
                    bookings = bookings.OrderBy(paginationDTO.SortByColumns);
            }

            bookings = bookings.Skip(paginationDTO.PageSize * (paginationDTO.PageNo - 1));
            bookings = bookings.Take(paginationDTO.PageSize);

            List<BookingEntity> records = await bookings.ToListAsync();
            if (records.Count > 0)
                paginationDTO.Data = Map<List<BookingEntity>, List<BookingDTO>>(records);

            return paginationDTO;

        }
    }
}