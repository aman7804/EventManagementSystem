using EMS.Entity.Base;
using EMS.Entity.Entity;
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
        
        [Required, ForeignKey("City")]
        public int CityId { set; get; }
        public CityEntity? City { get; set; }

        [Required , ForeignKey("State")]
        public int StateId { set; get; }
        public StateEntity? State { get; set; }

    }
}