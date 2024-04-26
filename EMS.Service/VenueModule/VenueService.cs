using AutoMapper;
using EMS.Entity;
using EMS.Repository.VenueModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using Microsoft.EntityFrameworkCore;

namespace EMS.Service.VenueModule
{
    public class VenueService : BaseService<VenueEntity, VenueDTO>, IVenueService
    {
        public VenueService(IMapper mapper, IVenueRepository venueRepo) : base(mapper, venueRepo) { }

		public async Task<List<DropDownDTO>> GetDropDownList()
		{
			List<DropDownDTO> dropDownList =
				await Repo.GetAll(null)
						.AsNoTracking()
						.Select(d => new DropDownDTO { Id = d.Id, Name = d.Name })
						.ToListAsync();
			return dropDownList;
		}
	}
}
