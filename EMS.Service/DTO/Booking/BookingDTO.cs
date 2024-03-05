using EMS.Shared;
using System.Text.Json.Serialization;

namespace EMS.Service.DTO.Booking
{
    public class BookingDTO : BaseDTO
    {
        public int CustomerId { get; set; }
        public string CustomerName { get; set; } = string.Empty!;
        public int NumberOfGuests { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal PaidAmount { get; set; }
        public int PackageId { get; set; }
        public string PackageName { get; set; } = string.Empty!;
        public EnumBookingStatus Status { get; set; }

        // for searching purpose
        [JsonIgnore] public string CustomerMobileNo = string.Empty!;
        [JsonIgnore] public string CustomerFirstName = string.Empty!;
        [JsonIgnore] public string CustomerLastName = string.Empty!;
        [JsonIgnore] public string CustomerEmailId = string.Empty!;
        [JsonIgnore] public string VenueName = string.Empty!;
        [JsonIgnore] public string PhotographyName = string.Empty!;
        [JsonIgnore] public string DecorationName = string.Empty!;
        [JsonIgnore] public string CateringName = string.Empty!;
        [JsonIgnore] public DateTime DateTime;
    }
}