using EMS.Entity.Base;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace EMS.Entity
{
    [Index(nameof(Name), IsUnique = true)]
    public class PackageEntity : BaseEntity
    {
        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty!;
        public bool IsActive { get; set; }
        public bool IsDraft { get; set; }

        // Navigation props

        [ForeignKey("Venue")]
        public int VenueId { get; set; }
        public virtual VenueEntity Venue { get; set; } = null!;

        [ForeignKey("Photography")]
        public int? PhotographyId { get; set; }
        public virtual PhotographyEntity? Photography { get; set; }

        [ForeignKey("Decoration")]
        public int? DecorationId { get; set; }
        public virtual DecorationEntity? Decoration { get; set; }

        [ForeignKey("Catering")]
        public int? CateringId { get; set; }
        public virtual CateringEntity? Catering { get; set; }

        public virtual IList<PackageEntity> Packages { get; set; } = null!;
    }
}
