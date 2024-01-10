using AutoMapper;
using EMS.Entity;
using EMS.Repository.CitytModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using Microsoft.AspNetCore.Http;

namespace EMS.Service.CityModule
{
    public class CityService : BaseService<CityEntity, CityDTO>, ICityService
    {
        public CityService(IMapper mapper, ICityRepository cityRepo) : base(mapper, cityRepo) { }
    }
}
