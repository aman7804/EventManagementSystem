using System.Linq.Expressions;

namespace EMS.Service.DTO.Filter
{
    public class StateFilter : FilterBase<StateDTO>
    {
        public string Search { get; set; } = string.Empty;

        public override Expression<Func<StateDTO, bool>> GetFilter()
        {
            Expression<Func<StateDTO, bool>> filter = x => x.Name.Contains(Search);
            return filter;
        }
    }
}
