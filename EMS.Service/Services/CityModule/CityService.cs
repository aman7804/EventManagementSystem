using AutoMapper;
using EMS.Entity.Entity;
using EMS.Repository.Repository.CitytModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using Microsoft.AspNetCore.Http;

namespace EMS.Service.Services.CityModule
{
    public class CityService : BaseService<CityEntity, CityDTO> ,ICityService
    {
        public CityService(IMapper mapper, ICityRepository cityRepo, IHttpContextAccessor contextAccessor) : base(mapper, cityRepo, contextAccessor) { }
    }
}
