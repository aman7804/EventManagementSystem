namespace EMS.Service.DTO
{
    public class PackageItemDTO : BaseDTO
    {
            public string Name { get; set; } = string.Empty!;
            public decimal Price { get; set; }
            public bool IsDraft { get; set; }


            // Navigation props
            public int? VenueId { get; set; }
            public string? VenueName { get; set; }
            public string? VenueAddress { get; set; }
            public int? PhotographyId { get; set; }
            public string? PhotographyName { get; set; }
            public string? PhotographyDescription { get; set; }
            public int? DecorationId { get; set; }
            public string? DecorationName { get; set; }
            public string? DecorationDescription { get; set; }
            public int? CateringId { get; set; }
            public string? CateringName { get; set; }
            public string? CateringDescription { get; set; }

        

    }
}
