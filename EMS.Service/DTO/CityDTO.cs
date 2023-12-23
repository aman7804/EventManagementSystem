
namespace EMS.Service.DTO
{
    public class CityDTO : BaseDTO
    {
        public string Name { set; get; } = string.Empty;
        public int StateId { set; get; }
    }
}
