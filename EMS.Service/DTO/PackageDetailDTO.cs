namespace EMS.Service.DTO
{
    public class PackageDetailDTO : BaseDTO
    {
        // venue details
        public string VenueName { set; get; } = string.Empty!;
        public string VenueAdd { set; get; } = string.Empty!;
        public decimal VenuePrice { set; get; }
        public string VenueDescription { set; get; } = string.Empty!;
        public int MinCapacity { set; get; }
        public int MaxCapacity { set; get; }
        public int CityId { set; get; }

        //photography details
        public string PhotographyName { set; get; } = string.Empty!;
        public decimal PhotographyPrice { set; get; }
        public string PhotographyDescription { set; get; } = string.Empty!;

        //decoration details
        public string DecorationName { set; get; } = string.Empty!;
        public decimal DecorationPrice { set; get; }
        public string DecorationDescription { set; get; } = string.Empty!;

        //catering details
        public string CateringName { set; get; } = string.Empty!;
        public decimal CateringPrice { set; get; }
        public string CateringDescription { set; get; } = string.Empty!;

    }
}
