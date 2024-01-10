using EMS.Entity.Base;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EMS.Entity
{
    [Index(nameof(Name), IsUnique = true)]
    public class VenueEntity : BaseEntity
    {
        [Required, StringLength(20)]
        public string Name { set; get; } = string.Empty!;

        [Required, Column(TypeName = "decimal(18,2)")]
        public decimal Price { set; get; }

        [Required, StringLength(100)]
        public string Description { set; get; } = string.Empty!;

        [DefaultValue(false)]
        public bool? IsActive { set; get; }

        [Required, StringLength(200)]
        public string Address { set; get; } = string.Empty!;
        
        [Required, Range(0, 100)] public int MinCapacity { set; get; }
        [Required, Range(900, 1000)] public int MaxCapacity { set; get; }
        
        [Required, ForeignKey("City")]
        public int CityId { set; get; }
        public virtual CityEntity City { get; set; } = null!;

    }
}