using System.Linq.Expressions;

namespace EMS.Service.DTO.Filter
{
    public class UserFilter : FilterBase<UserDTO>
    {
        public string Search { get; set; } = string.Empty;

        public override Expression<Func<UserDTO, bool>> GetFilter()
        {
            Expression<Func<UserDTO, bool>> filter = x => x.FirstName.Contains(Search) || x.LastName.Contains(Search) || x.MobileNo.Contains(Search) || x.EmailId.Contains(Search);
            return filter;
        }
    }
}
