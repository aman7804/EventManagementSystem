namespace EMS.Service.DTO
{
    public class VenueDTO : BaseVendorDTO
    {
        public static int MinCapacity { set; get; }
        public static int MaxCapacity { set; get; }
        public int CityId { set; get; }
    }
}
