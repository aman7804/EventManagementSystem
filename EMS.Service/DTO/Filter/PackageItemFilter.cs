using System.Linq.Expressions;

namespace EMS.Service.DTO.Filter
{
    public class PackageItemFilter : FilterBase<PackageItemDTO>
    {
        public string Search { get; set; } = string.Empty;
        public override Expression<Func<PackageItemDTO, bool>> GetFilter()
        {
            Expression<Func<PackageItemDTO, bool>> filter = x => x.Name.Contains(Search);
            return filter;
        }
    }
}
