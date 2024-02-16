using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using EMS.Entity.Base;
using EMS.Shared;
using Microsoft.EntityFrameworkCore;

namespace EMS.Entity
{
    [Index(nameof(EmailId), IsUnique = true)]
    public class UserEntity : BaseEntity
    {
        [Required, StringLength(50)]
        public string FirstName { get; set; } = string.Empty!;
        
        [StringLength(50)]
        public string LastName { get; set; } = string.Empty!;
        
        [Required, StringLength(256)]
        public string EmailId { get; set; } = string.Empty!;

        [Required, StringLength(256)]
        public string Password { get; set; } = string.Empty!;

        [Required, StringLength(16)]
        public string MobileNo { get; set; } = string.Empty!;

        [Required, StringLength(500)]
        public string Address { get; set; } = string.Empty!;
        public EnumRole? Role { get; set; }
    }
}

