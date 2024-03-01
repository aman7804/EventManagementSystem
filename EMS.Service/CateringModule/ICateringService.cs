using EMS.Entity;
using EMS.Service.Base;
using EMS.Service.DTO;

namespace EMS.Service.CateringModule
{
    public interface ICateringService : IBaseService<CateringEntity, CateringDTO>
    {
		Task<List<DropDownDTO>> GetDropDownList();

	}
}
