using EMS.Entity.Base;
using EMS.Shared;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EMS.Entity
{
    public class BookingEntity : BaseEntity
    {
        [Required] public int CustomerId { get; set; }
        [Required, Range(0, 100)] public int MinGuest { get; set; } // should i validate this and bellow one too, idk which validation would be nice?
        [Required, Range(900, 1000)] public int MaxGuest { get; set; }

        [Required, Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        [Required, Column(TypeName = "decimal(18,2)")]
        public decimal DueAmount { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;  // should i give it default value, if yes: where?   

        [ForeignKey("Package")]
        public int PackageId { get; set; }
        public PackageEntity Package { get; set; } = null!;
        public EnumBookingStatus Status { get; set; } = EnumBookingStatus.Pending;  //should i validate this, if yes how?
    }

}
