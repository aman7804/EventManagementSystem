using EMS.Shared;

namespace EMS.Service.DTO
{
    public class UserDTO : BaseDTO
    {
        public string FirstName { get; set; }   = string.Empty!;
        public string LastName { get; set; } = string.Empty!;
        public string EmailId { get; set; } = string.Empty!;
        public string MobileNo { get; set; } = string.Empty!;
    }
}
