using EMS.Entity.Base;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EMS.Entity
{
    [Index(nameof(Name), IsUnique = true)]
    public class VenueEntity : BaseEntity
    {
        [Required, StringLength(100)]
        public string Name { set; get; } = string.Empty!;

        [Required, Column(TypeName = "decimal(18,2)")]
        public decimal Price { set; get; }

        [Required, StringLength(100)]
        public string Description { set; get; } = string.Empty!;
        public bool? IsActive { set; get; }

        [Required, StringLength(200)]
        public string Address { set; get; } = string.Empty!;
        
        [Required] public int MinCapacity { set; get; }
        [Required] public int MaxCapacity { set; get; }
        
        [Required, ForeignKey("City")]
        public int CityId { set; get; }
        public virtual CityEntity City { get; set; } = null!;
        public virtual IList<PackageEntity> Packages { get; set; } = null!;

    }
}