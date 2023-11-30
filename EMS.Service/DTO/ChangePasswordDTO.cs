namespace EMS.Service.DTO
{
    public class ChangePasswordDTO : BaseDTO
    {
        public string EmailId { get; set; } = string.Empty!;
        public string OldPassword { get; set; } = string.Empty!;
        public string NewPassword { get; set; } = string.Empty!;
    }
}
