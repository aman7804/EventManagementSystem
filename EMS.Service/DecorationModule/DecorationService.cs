using AutoMapper;
using EMS.Entity;
using EMS.Repository.DecorationModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using Microsoft.AspNetCore.Http;

namespace EMS.Service.DecorationModule
{
    public class DecorationService : BaseService<DecorationEntity, DecorationDTO>, IDecorationService
    {
        public DecorationService(IMapper mapper, IDecorationRepository decorationRepository)
            : base(mapper, decorationRepository) { }
    }
}
