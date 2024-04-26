using EMS.Entity;
using EMS.Service.Base;
using EMS.Service.DTO;

namespace EMS.Service.DecorationModule
{
    public interface IDecorationService : IBaseService<DecorationEntity, DecorationDTO>
    {
		Task<List<DropDownDTO>> GetDropDownList();

	}
}
