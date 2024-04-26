namespace EMS.Service.DTO
{
    public enum Sorting
    {
        Ascending,
        Descending,
    }
    public class PaginationDTO<T> where T : BaseDTO
    {
        public int PageNo { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public int PageCount { get; set; } = 1;
        public int RecordCount { get; set; } = 1;

        public Sorting SortBy { get; set; } = Sorting.Ascending;
        public string SortByColumns { get; set; } = string.Empty;

        public FilterDTO<T> FilterDTO { get; set; } = null!;

        public List<T> Data { get; set; } = null!;
    }
}
