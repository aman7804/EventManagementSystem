using EMS.Entity.Base;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace EMS.Entity.Entity
{
    [Index(nameof(MobileNo), nameof(Email), IsUnique = true)]
    public class CateringEntity : BaseVendorEntity
    {
        [Required, ForeignKey("City")]
        public int CityId { set; get; }
        public virtual CityEntity City { get; set; } = null!;
    }
}
