using System.ComponentModel.DataAnnotations;

namespace EMS.Entity.Base
{
    public abstract class BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}
