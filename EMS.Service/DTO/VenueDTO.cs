namespace EMS.Service.DTO
{
    public class VenueDTO : BaseDTO
    {
        public string Name { set; get; } = string.Empty!;
        public string Address { set; get; } = string.Empty!;
        public decimal Price { set; get; }
        public string Description { set; get; } = string.Empty!;
        public bool IsActive { set; get; }
        public static int MinCapacity { set; get; }
        public static int MaxCapacity { set; get; }
        public int CityId { set; get; }
    }
}
