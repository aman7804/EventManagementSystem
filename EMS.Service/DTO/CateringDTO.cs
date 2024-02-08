namespace EMS.Service.DTO
{
    public class CateringDTO : BaseDTO
    {
        public string Name { set; get; } = string.Empty!;
        public decimal Price { set; get; }
        public string Description { set; get; } = string.Empty!;
        public bool IsActive { set; get; }
    }
}