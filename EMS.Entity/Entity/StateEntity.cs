using System.ComponentModel.DataAnnotations;
using EMS.Entity.Base;

namespace EMS.Entity
{
    public class StateEntity : BaseEntity
    {
        [Required, StringLength(32)]
        public string Name { set; get; } = string.Empty;
    }
}
