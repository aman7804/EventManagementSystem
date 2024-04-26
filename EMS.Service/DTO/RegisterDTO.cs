using EMS.Shared;
using System.Text.Json.Serialization;

namespace EMS.Service.DTO
{
    public class RegisterDTO
    {
        public string FirstName { get; set; } = string.Empty!;
        public string LastName { get; set; } = string.Empty!;
        public string EmailId { get; set; } = string.Empty!;
        public string MobileNo { get; set; } = string.Empty!;
        public string Password { get; set; } = string.Empty!;
        public string Address { get; set; } = string.Empty!;
        [JsonIgnore] public EnumRole Role { get; set; }
    }
}
