using System.Linq.Expressions;

namespace EMS.Service.DTO.Filter
{
    public class PhotographyFilter : FilterBase<PhotographyDTO>
    {
        public string Search { get; set; } = string.Empty;

        public override Expression<Func<PhotographyDTO, bool>> GetFilter()
        {
            Expression<Func<PhotographyDTO, bool>> filter = x => x.Name.Contains(Search);
            return filter;
        }
    }
}
