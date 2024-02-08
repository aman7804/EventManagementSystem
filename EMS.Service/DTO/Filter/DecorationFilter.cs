using System.Linq.Expressions;

namespace EMS.Service.DTO.Filter
{
    public class DecorationFilter: FilterBase<DecorationDTO>
    {
        public string Search { get; set; } = string.Empty;

        public override Expression<Func<DecorationDTO, bool>> GetFilter()
        {
            Expression<Func<DecorationDTO, bool>> filter = x => x.Name.Contains(Search);
            return filter;
        }
    }
}
