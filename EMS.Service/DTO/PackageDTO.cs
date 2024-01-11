namespace EMS.Service.DTO
{
    public class PackageDTO : BaseDTO
    {
        public string Name { get; set; } = string.Empty!;
        public bool IsActive { get; set; }
        public bool IsDraft { get; set; } = false;

        // Navigation props
        public int VenueId { get; set; }
        public string VenueName { get; set; } = string.Empty!;
        public int? PhotographyId { get; set; }
        public string? PhotographyName { get; set; } = string.Empty!;
        public int? DecorationId { get; set; }
        public string? DecorationName { get; set; } = string.Empty!;
        public int? CateringId { get; set; }
        public string? CateringName { get; set; } = string.Empty!;
    }
}
