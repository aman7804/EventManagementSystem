using AutoMapper;
using EMS.Entity.Entity;
using EMS.Repository.Repository.CateringModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using Microsoft.AspNetCore.Http;

namespace EMS.Service.Services.CateringModule
{
    public class CateringService : BaseService<CateringEntity, CateringDTO>, ICateringService
    {
        public CateringService(IMapper mapper, ICateringRepository cateringRepository, IHttpContextAccessor contextAccessor) : base(mapper, cateringRepository, contextAccessor) { }   
    }
}
