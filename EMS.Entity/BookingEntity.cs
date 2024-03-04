using EMS.Entity.Base;
using EMS.Shared;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EMS.Entity
{
    public class BookingEntity : SoftDeleteBaseEntity
    {
        [Required] public int CustomerId { get; set; }
        [Required] public int MinGuest { get; set; }
        [Required] public int MaxGuest { get; set; }

        [Required, Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        [Required, Column(TypeName = "decimal(18,2)")]
        public decimal DueAmount { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;   

        [ForeignKey("Package")]
        public int PackageId { get; set; }
        public PackageEntity Package { get; set; } = null!;
        public EnumBookingStatus Status { get; set; } = EnumBookingStatus.Pending;
    }

}
