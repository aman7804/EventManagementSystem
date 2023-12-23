using AutoMapper;
using EMS.Entity.Entity;
using EMS.Repository.Repository.CitytModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using EMS.Shared.Constant;

namespace EMS.Service.Services.CityModule
{
    public class CityService : BaseService<CityEntity, CityDTO> ,ICityService
    {
        public CityService(IMapper mapper, ICityRepository cityRepo): base(mapper, cityRepo) { }
    }
}
