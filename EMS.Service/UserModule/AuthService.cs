using AutoMapper;
using EMS.Entity;
using EMS.Repository.UserModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using EMS.Shared.Constant;
using System.Security.Cryptography;
using System.Text;

namespace EMS.Service.UserModule
{
    public class AuthService : BaseService<UserEntity, UserDTO>, IAuthService
    {
        public AuthService(IMapper mapper, IUserRepository userRepository)
            : base(mapper, userRepository) { }

        public async Task ChangePassword(ChangePasswordDTO changePasswordDTO)
        {
            UserEntity? user = await Repo.GetAsync(x => x.EmailId == changePasswordDTO.EmailId, false)
                ?? throw new Exception(ExceptionMessage.USER_NOT_FOUND);

            if (!Encrypt(changePasswordDTO.OldPassword).Equals(user.Password))
                throw new Exception(ExceptionMessage.PASSWORD_IS_INCORRECT);

            user.Password = Encrypt(changePasswordDTO.NewPassword);

            await Repo.UpdateAsync(user);
        }

        public async Task<UserDTO> GetByEmailId(string emailId)
        {
            UserEntity? user = await Repo.GetAsync(x => x.EmailId == emailId, true)
                ?? throw new Exception(ExceptionMessage.USER_NOT_FOUND);
            return ToDTO(user);
        }

        public async Task<UserDTO> Login(LoginDTO loginDTO)
        {
            UserEntity? user = await Repo.GetAsync(x => x.EmailId == loginDTO.EmailId, false)
                ?? throw new Exception(ExceptionMessage.USER_NOT_FOUND);

            if (!Encrypt(loginDTO.Password).Equals(user.Password))
                throw new Exception(ExceptionMessage.PASSWORD_IS_INCORRECT);

            return ToDTO(user);
        }

        public async Task RegisterUser(RegisterDTO registerDTO)
        {
            registerDTO.Role = Shared.EnumRole.Customer;
            UserEntity user = Mapper.Map<RegisterDTO, UserEntity>(registerDTO);
            user.Password = Encrypt(registerDTO.Password);
            await Repo.AddAsync(user);
        }

        public string GeneratePassword(int length = 7)
        {
            const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            StringBuilder res = new StringBuilder();
            Random rnd = new Random();
            while (0 < length--)
            {
                res.Append(valid[rnd.Next(valid.Length)]);
            }
            return res.ToString();
        }

        private static string Encrypt(string text)
        {
            string EncryptionKey = "A#$Derclfkdws"; // SecurityKey
            byte[] clearBytes = Encoding.Unicode.GetBytes(text);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new(EncryptionKey, new byte[] {
                    0x49,0x76,0x61,0x6e,0x20,0x4d,0x65,0x64,0x76,0x65,0x64,0x65,0x76
                });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using MemoryStream ms = new();
                using (CryptoStream cs = new(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                {
                    cs.Write(clearBytes, 0, clearBytes.Length);
                    cs.Close();
                }
                text = Convert.ToBase64String(ms.ToArray());
            }
            return text;
        }

    }
}
