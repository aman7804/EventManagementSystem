using EMS.Entity.Base;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace EMS.Entity
{
    [Index(nameof(Name), IsUnique = true)]
    public class PackageEntity : BaseEntity
    {
        [Required, StringLength(50)]
        public string Name { get; set; } = string.Empty!;

        [Required, Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public bool IsActive { get; set; }
        public bool IsDraft { get; set; }

        // Navigation props

        [ForeignKey("Venue")]
        public int? VenueId { get; set; }
        public virtual VenueEntity Venue { get; set; } = null!;

        [ForeignKey("Photography")]
        public int? PhotographyId { get; set; }
        public virtual PhotographyEntity Photography { get; set; } = null!;

        [ForeignKey("Decoration")]
        public int? DecorationId { get; set; }
        public virtual DecorationEntity Decoration { get; set; } = null!;

        [ForeignKey("Catering")]
        public int? CateringId { get; set; }
        public virtual CateringEntity Catering { get; set; } = null!;
    }
}
