using EMS.Entity.Base;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace EMS.Entity.Entity
{
    [Index(nameof(MobileNo), nameof(Email), IsUnique = true)]
    public class DecorationEntity : BaseVendorEntity
    {
        [Required, ForeignKey("City")]
        public int CityId { set; get; }
        public CityEntity? City { get; set; }

        [Required, ForeignKey("State")]
        public int StateId { set; get; }
        public StateEntity? State { get; set; }
    }
}
