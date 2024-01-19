using System.ComponentModel.DataAnnotations;

namespace EMS.Entity
{
    public class TaskEntity : BaseEntity
    {
        [Required, StringLength(500)]
        public string Description { get; set; } = string.Empty!;
    }
}
