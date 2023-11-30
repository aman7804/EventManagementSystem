using System.Linq.Expressions;

namespace EMS.Service.DTO
{
    public abstract class FilterDTO<T> where T : BaseDTO
    {

        public abstract Expression<Func<T, bool>> GetFilter();
    }
}
