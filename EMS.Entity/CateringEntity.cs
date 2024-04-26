using EMS.Entity.Base;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace EMS.Entity
{
    [Index(nameof(Name), IsUnique = true)]
    public class CateringEntity : BaseEntity
    {
        [Required, StringLength(100)]
        public string Name { set; get; } = string.Empty!;

        [Required, Column(TypeName = "decimal(18,2)")]
        public decimal PricePerPlate { set; get; }

        [Required, StringLength(250)]
        public string Description { set; get; } = string.Empty!;
        public bool? IsActive { set; get; }
    }
}
