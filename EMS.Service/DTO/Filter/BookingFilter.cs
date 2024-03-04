using System.Linq.Expressions;

namespace EMS.Service.DTO.Filter
{
    public class BookingFilter: FilterBase<BookingDTO>
    {
        public string Search { get; set; } = string.Empty;

        public override Expression<Func<BookingDTO, bool>> GetFilter()
        {
            if(Search != null)
            {
                Expression<Func<BookingDTO, bool>> filter;

                if (Search.Length == 10 && int.TryParse(Search, out _))
                    return x => x.CustomerMobileNo.Equals(int.Parse(Search));
                else if (int.TryParse(Search, out _))
                    return x =>
                        x.MinGuest.Equals(int.Parse(Search)) ||
                        x.MaxGuest.Equals(int.Parse(Search));
                else
                    return filter = x =>
                        x.PackageName.Contains(Search) ||
                        x.CustomerFirstName.Contains(Search) ||
                        x.CustomerLastName.Contains(Search) ||
                        x.CustomerEmailId.Contains(Search) ||
                        x.CustomerMobileNo.Contains(Search) ||
                        x.VenueName.Contains(Search) ||
                        x.PhotographyName.Contains(Search) ||
                        x.CateringName.Contains(Search) ||
                        x.DecorationName.Contains(Search);
            }
            return x => true;
        }

    }
}
