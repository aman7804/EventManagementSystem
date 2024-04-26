using System.ComponentModel.DataAnnotations;
using EMS.Entity.Base;
using Microsoft.EntityFrameworkCore;

namespace EMS.Entity
{
    [Index(nameof(Name), IsUnique = true)]
    public class StateEntity : BaseEntity
    {
        [Required, StringLength(32)]
        public string Name { set; get; } = string.Empty!;
        public IList<CityEntity> Cities { get; set; } = null!;
    }
}
