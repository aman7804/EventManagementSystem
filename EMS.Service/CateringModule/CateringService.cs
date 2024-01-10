using AutoMapper;
using EMS.Entity;
using EMS.Repository.CateringModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using Microsoft.AspNetCore.Http;

namespace EMS.Service.CateringModule
{
    public class CateringService : BaseService<CateringEntity, CateringDTO>, ICateringService
    {
        public CateringService(IMapper mapper, ICateringRepository cateringRepository) : base(mapper, cateringRepository) { }
    }
}
