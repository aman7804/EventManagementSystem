using System.ComponentModel.DataAnnotations;

namespace EMS.Service.DTO
{
    public class StateDTO : BaseDTO
    {
        [Required, StringLength(32)]
        public string Name { set; get; } = string.Empty;
    }
}
