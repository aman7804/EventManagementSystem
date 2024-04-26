using AutoMapper;
using EMS.Entity;
using EMS.Repository.CitytModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using Microsoft.EntityFrameworkCore;

namespace EMS.Service.CityModule
{
    public class CityService : BaseService<CityEntity, CityDTO>, ICityService
    {
        public CityService(IMapper mapper, ICityRepository cityRepo) : base(mapper, cityRepo) { }

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
