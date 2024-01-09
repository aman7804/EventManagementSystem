namespace EMS.Service.DTO
{
    public class BookingDTO : BaseDTO
    {
        public int MinGuest { get; set; }
        public int MaxGuest { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal DueAmount { get; set; }
        public int PackageId { get; set; }
    }
}
