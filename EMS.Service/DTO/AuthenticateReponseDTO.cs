namespace EMS.Service.DTO;
public class AuthenticateResponseDTO : BaseDTO
{
    public string FirstName { get; set; } = string.Empty!;
    public string LastName { get; set; } = string.Empty!;
    public string EmailId { get; set; } = string.Empty!;
    public string? Token { get; set; }
    public AuthenticateResponseDTO(UserDTO user, string? token)
    {
        Id = user.Id;
        FirstName = user.FirstName;
        LastName = user.LastName; 
        EmailId = user.EmailId;
        Token = token;
    }
}