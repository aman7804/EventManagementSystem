namespace EMS.Service.DTO;
public class AuthenticateResponseDTO : BaseDTO
{
    public string FullName { get; set; } = string.Empty!;
    public string EmailId { get; set; } = string.Empty!;
    public string Token { get; set; }

    public AuthenticateResponseDTO(UserDTO user, string token)
    {
        Id = user.Id;
        FullName = string.Join(" ", user.FirstName, user.LastName);
        EmailId = user.EmailId;
        Token = token;
    }
}