using EMS.Entity;
using EMS.Service.Base;
using EMS.Service.DTO;

namespace EMS.Service.VenueModule
{
    public interface IVenueService : IBaseService<VenueEntity, VenueDTO>
    {
		Task<List<DropDownDTO>> GetDropDownList();
	}
}
