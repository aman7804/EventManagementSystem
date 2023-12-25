    using EMS.Entity.Base;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EMS.Entity
{
    [Index(nameof(MobileNo), nameof(Email), IsUnique = true)]
    public class VenueEntity : BaseVendorEntity
    {
        [Required]
        public static int MinCapacity { set; get; }
        
        [Required]
        public static int MaxCapacity { set; get; }
        
        [Required, ForeignKey("CityEntity")]
        public int CityId { set; get; }

        [Required , ForeignKey("StateEntity")]
        public int StateId { set; get; }

    }
}