using EMS.Entity.Base;
using System.Linq.Expressions;

namespace EMS.Service.DTO.Filter
{
    public class VenueFilter : FilterBase<VenueDTO> 
    {
        public string Search {  get; set; } = string.Empty;

        public override Expression<Func<VenueDTO, bool>> GetFilter()
        {
            Expression<Func<VenueDTO, bool>> filter = x =>
                x.Name.Contains(Search) || x.Address.Contains(Search)
                                        || x.Description.Contains(Search);
            return filter;
        }
    }
}
