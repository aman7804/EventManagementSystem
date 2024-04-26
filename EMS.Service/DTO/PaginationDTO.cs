using EMS.Shared;
using System.Linq.Expressions;

namespace EMS.Service.DTO
{

    public class PaginationDTO<D, F> where F : FilterBase<D> where D : BaseDTO
    {
        public int PageNo { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public int PageCount { get; set; } = 1;
        public int RecordCount { get; set; } = 1;

        public EnumSortBy SortBy { get; set; } = EnumSortBy.Ascending;
        public string SortByColumns { get; set; } = string.Empty;

        public F Filter { get; set; } = null!;

        public List<D> Data { get; set; } = null!;
    }

    public abstract class FilterBase<D> where D : class
    {
        public abstract Expression<Func<D, bool>> GetFilter();
    }

}