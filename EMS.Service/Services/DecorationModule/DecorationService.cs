using AutoMapper;
using EMS.Entity.Entity;
using EMS.Repository.Repository.DecorationModule;
using EMS.Service.Base;
using EMS.Service.DTO;

namespace EMS.Service.Services.DecorationModule
{
    public class DecorationService : BaseService<DecorationEntity, DecorationDTO>, IDecorationService
    {
        public DecorationService(IMapper mapper, IDecorationRepository decorationRepository) : base(mapper, decorationRepository) { }  
    }
}
