using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EMS.Entity.Base
{
    public class BaseVendorEntity : BaseEntity
    {
        public bool? IsChecked { set; get; }
        
        [Required, StringLength(20)]
        public string Name { set; get; } = string.Empty!;

        [StringLength(15)]
        public string MobileNo { set; get; } = string.Empty!;
        
        [Required, StringLength(50)]
        public string Email { set; get; } = string.Empty!;
        
        [Required, StringLength(200)] 
        public string Add { set; get; } = string.Empty!;

        [Required , Column(TypeName = "decimal(18,2)")]
        public decimal Price { set; get; }

        [Required, StringLength(250)]
        public string Description { set; get; } = string.Empty!;
        public bool? IsActive { set; get; }
        
        [Required]
        public bool? IsAvailable { set; get; }
    }
}
