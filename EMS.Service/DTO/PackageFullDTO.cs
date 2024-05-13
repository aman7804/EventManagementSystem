namespace EMS.Service.DTO
{
    public class PackageFullDTO : BaseDTO
    {
        public string Name { get; set; } = string.Empty!;
        public bool IsActive { get; set; }
        public bool IsDraft { get; set; } = false;
        // venue details
        public int VenueId { set; get; }
        public string VenueName { set; get; } = string.Empty!;
        public string VenueAddress { set; get; } = string.Empty!;
        public decimal VenuePrice { set; get; }
        public string VenueDescription { set; get; } = string.Empty!;
        public int MinCapacity { set; get; }
        public int MaxCapacity { set; get; }
        public int CityId { set; get; }

        //photography details
        public int PhotographyId { set; get; }
        public string? PhotographyName { set; get; }
        public decimal? PhotographyPrice { set; get; }
        public string? PhotographyDescription { set; get; }

        //decoration details
        public int DecorationId { set; get; }
        public string? DecorationName { set; get; }
        public decimal? DecorationPrice { set; get; }
        public string? DecorationDescription { set; get; }

        //catering details
        public int CateringId { set; get; }
        public string? CateringName { set; get; }
        public decimal? CateringPrice { set; get; }
        public string? CateringDescription { set; get; }

    }
}
