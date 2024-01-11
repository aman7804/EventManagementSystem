namespace EMS.Service.DTO
{
    public class PackageDetailDTO : BaseDTO
    {
        // venue details
        public string VenueName { set; get; } = string.Empty!;
        public string VenueAddress { set; get; } = string.Empty!;
        public decimal VenuePrice { set; get; }
        public string VenueDescription { set; get; } = string.Empty!;
        public int MinCapacity { set; get; }
        public int MaxCapacity { set; get; }
        public int CityId { set; get; }

        //photography details
        public string? PhotographyName { set; get; }
        public decimal? PhotographyPrice { set; get; }
        public string? PhotographyDescription { set; get; }

        //decoration details
        public string? DecorationName { set; get; }
        public decimal? DecorationPrice { set; get; }
        public string? DecorationDescription { set; get; }

        //catering details
        public string? CateringName { set; get; }
        public decimal? CateringPrice { set; get; }
        public string? CateringDescription { set; get; }

    }
}
