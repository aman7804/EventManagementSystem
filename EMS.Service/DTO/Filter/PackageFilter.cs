using System.Linq.Expressions;

namespace EMS.Service.DTO.Filter
{
    public class PackageFilter : FilterBase<PackageDTO>
    {
        public string Search { get; set; } = string.Empty;

        public override Expression<Func<PackageDTO, bool>> GetFilter()
        {
            Expression<Func<PackageDTO, bool>> filter = x => x.Name.Contains(Search);
            return filter;
        }
    }
}
