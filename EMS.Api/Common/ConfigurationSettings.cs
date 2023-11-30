namespace EMS.Api.Common
{
    public class ConfigurationSettings
    {
        public string AllowedHosts { get; set; } = string.Empty!;
        public JwtSetting Jwt { get; set; } = null!;
        public ConnectionStringSetting ConnectionString { get; set; } = null!;


        public class JwtSetting
        {
            public string Secret { get; set; } = string.Empty!;
        }
        public class ConnectionStringSetting
        {
            public string Default { get; set; } = string.Empty!;
        }
    }
}
