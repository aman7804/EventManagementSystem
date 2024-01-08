namespace EMS.Api.ViewModels
{
    public class ApiResult<T> where T : class
    {
        public int Code { get; set; }
        public string Message { get; set; } = string.Empty!;
        public T? Data { get; set; }
        public bool IsSuccessStatusCode
        {
            get => Code >= 200 && Code <= 299;
        }
        public bool IsValid
        {
            get
            {
                if (this.Data is IEnumerable<T> enumerable && enumerable.Any()) return true;
                return this.Data != null;
            }
        }
    }
}
