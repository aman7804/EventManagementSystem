using EMS.Shared;
using System.Text.Json.Serialization;

namespace EMS.Service.DTO.Booking
{
	public class SaveBookingDTO: BaseDTO
	{
		public int NumberOfGuests { get; set; }
		public decimal TotalAmount { get; set; }
		public decimal PaidAmount { get; set; }
		public int PackageId { get; set; }
		[JsonIgnore] public EnumBookingStatus Status { get; set; }
		[JsonIgnore] public int CustomerId { get; set; }
	}
}
