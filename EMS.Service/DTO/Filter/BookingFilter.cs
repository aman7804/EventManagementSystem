using System.Linq.Expressions;
using EMS.Service.DTO.Booking;

namespace EMS.Service.DTO.Filter
{
    public class BookingFilter: FilterBase<BookingDTO>
    {
        public string Search { get; set; } = string.Empty;
		public DateTime Date { get; set; } = DateTime.MinValue.Date;

        public override Expression<Func<BookingDTO, bool>> GetFilter()
        {
            if(!string.IsNullOrWhiteSpace(Search) && Date != DateTime.MinValue.Date)
            {
                if (Search.Length == 10 && int.TryParse(Search, out _))
                    return x => x.CustomerMobileNo.Equals(int.Parse(Search)) &&
                                x.DateTime.ToLocalTime().Date.Equals(Date.ToLocalTime());
                else if (int.TryParse(Search, out _))
                    return x =>
                        x.DateTime.Date.Equals(Date.ToLocalTime()) &&
                        x.NumberOfGuests.Equals(int.Parse(Search));
                else
                    return x =>
                        x.DateTime.Date.Equals(Date.ToLocalTime()) &&
                        (
                            x.PackageName.Contains(Search) ||
                            x.CustomerFirstName.Contains(Search) ||
                            x.CustomerLastName.Contains(Search) ||
                            x.CustomerEmailId.Contains(Search) ||
                            x.CustomerMobileNo.Contains(Search) ||
                            x.VenueName.Contains(Search) ||
                            x.PhotographyName.Contains(Search) ||
                            x.CateringName.Contains(Search) ||
                            x.DecorationName.Contains(Search)
                        );
			}
            if(!string.IsNullOrWhiteSpace(Search))
            {
                if (Search.Length == 10 && int.TryParse(Search, out _))
                    return x => x.CustomerMobileNo.Equals(int.Parse(Search));
                else if (int.TryParse(Search, out _))
                    return x =>
						x.NumberOfGuests.Equals(int.Parse(Search));
				else
                    return x =>
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
            if (Date != DateTime.MinValue.Date)
                return x => x.DateTime.Date.Equals(Date.ToLocalTime());
            
            return x => true;   
        }

    }
}
