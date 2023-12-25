namespace EMS.Service.DTO
{
    public class BaseVendorDTO : BaseDTO
    {
        public bool IsChecked { set; get; }
        public string Name { set; get; } = string.Empty!;
        public string MobileNo { set; get; } = string.Empty!;
        public string Email { set; get; } = string.Empty!;
        public string Add { set; get; } = string.Empty!;
        public decimal Price { set; get; }
        public string Description { set; get; } = string.Empty!;
        public bool IsActive { set; get; }
        public bool IsAvailable { set; get; }
    }
}
