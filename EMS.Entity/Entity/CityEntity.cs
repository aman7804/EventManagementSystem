using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using EMS.Entity.Base;
using Microsoft.EntityFrameworkCore;

namespace EMS.Entity.Entity
{
    [Index(nameof(Name), IsUnique = true)]
    public  class CityEntity : BaseEntity
    {
        [Required]
        public string Name { set; get; } = string.Empty!;
        
        [Required, ForeignKey("State")]
        public int StateId { set; get; }
    }
}
