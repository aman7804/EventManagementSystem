using System.Linq.Expressions;

namespace EMS.Service.DTO.Filter
{
    public class CateringFilter : FilterBase<CateringDTO>
    {
        public string Search { get; set; } = string.Empty;

        public override Expression<Func<CateringDTO, bool>> GetFilter()
        {
            Expression<Func<CateringDTO, bool>> filter = x => x.Name.Contains(Search);
            return filter;
        }
    }
}
