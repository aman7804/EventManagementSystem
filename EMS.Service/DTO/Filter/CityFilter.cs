using System.Linq.Expressions;

namespace EMS.Service.DTO.Filter
{
    public class CityFilter: FilterBase<CityDTO>
    {
        public string Search { get; set; } = string.Empty;

        public override Expression<Func<CityDTO, bool>> GetFilter()
        {
            Expression<Func<CityDTO, bool>> filter = x => x.Name.Contains(Search);
            return filter;
        }
    }
}
