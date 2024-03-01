using AutoMapper;
using EMS.Entity;
using EMS.Repository.CateringModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using Microsoft.EntityFrameworkCore;

namespace EMS.Service.CateringModule
{
    public class CateringService : BaseService<CateringEntity, CateringDTO>, ICateringService
    {
        public CateringService(IMapper mapper, ICateringRepository cateringRepository)
            : base(mapper, cateringRepository) { }

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
