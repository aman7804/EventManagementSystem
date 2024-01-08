using AutoMapper;
using EMS.Entity.Entity;
using EMS.Repository.Repository.DecorationModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using Microsoft.AspNetCore.Http;

namespace EMS.Service.Services.DecorationModule
{
    public class DecorationService : BaseService<DecorationEntity, DecorationDTO>, IDecorationService
    {
        public DecorationService(IMapper mapper, IDecorationRepository decorationRepository, IHttpContextAccessor contextAccessor)
            : base(mapper, decorationRepository, contextAccessor) { }  
    }
}
