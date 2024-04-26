using AutoMapper;
using EMS.Entity;
using EMS.Repository.PhotographyModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using Microsoft.EntityFrameworkCore;

namespace EMS.Service.PhotographyModule
{
    public class PhotographyService : BaseService<PhotographyEntity, PhotographyDTO>, IPhotographyService
    {
        public PhotographyService(IMapper mapper, IPhotographyRepository photographyRepository)
            : base(mapper, photographyRepository) { }

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
