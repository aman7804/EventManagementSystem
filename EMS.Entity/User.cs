using System.ComponentModel.DataAnnotations;

namespace EMS.Entity
{
    public class User : BaseEntity
    {
        [Required, StringLength(50)]
        public string FirstName { get; set; } = string.Empty!;

        [StringLength(50)]
        public string LastName { get; set; } = string.Empty!;
        [Required, StringLength(256)]
        public string EmailId { get; set; } = string.Empty!;

        [Required, StringLength(256)]
        public string Password { get; set; } = string.Empty!;

        [StringLength(16)]
        public string MobileNo { get; set; } = string.Empty!;
    }
}
