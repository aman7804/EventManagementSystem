using AutoMapper;
using EMS.Entity;
using EMS.Repository.DecorationModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using Microsoft.EntityFrameworkCore;

namespace EMS.Service.DecorationModule
{
    public class DecorationService : BaseService<DecorationEntity, DecorationDTO>, IDecorationService
    {
        public DecorationService(IMapper mapper, IDecorationRepository decorationRepository)
            : base(mapper, decorationRepository) { }

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
