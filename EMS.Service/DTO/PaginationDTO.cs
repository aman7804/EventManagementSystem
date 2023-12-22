using EMS.Shared;

namespace EMS.Service.DTO
{
    
    public class PaginationDTO<T> where T : BaseDTO
    {
        public int PageNo { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public int PageCount { get; set; } = 1;
        public int RecordCount { get; set; } = 1;

        public EnumSortBy SortBy { get; set; } = EnumSortBy.Ascending;
        public string SortByColumns { get; set; } = string.Empty;

        //public FilterDTO<T> FilterDTO { get; set; } = null!;

        public List<T> Data { get; set; } = null!;
    }

    //public class PaginationResultDTO<T> where T : BaseDTO
    //{
    //    public PaginationResultDTO()
    //    {
    //        return await _baseService.GetPageAsync(pagination);
    //    }
    ////}

}