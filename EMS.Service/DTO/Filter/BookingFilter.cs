using System.Linq.Expressions;

namespace EMS.Service.DTO.Filter
{
    public class BookingFilter: FilterBase<BookingDTO>
    {
        public string Search { get; set; } = string.Empty;

        public override Expression<Func<BookingDTO, bool>> GetFilter()
        {
            Expression<Func<BookingDTO, bool>> filter = x => x.Id.Equals(int.Parse(Search));
            return filter;
        }

    }
}
