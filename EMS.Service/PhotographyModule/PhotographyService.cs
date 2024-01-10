using AutoMapper;
using EMS.Entity;
using EMS.Repository.PhotographyModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using Microsoft.AspNetCore.Http;

namespace EMS.Service.PhotographyModule
{
    public class PhotographyService : BaseService<PhotographyEntity, PhotographyDTO>, IPhotographyService
    {
        public PhotographyService(IMapper mapper, IPhotographyRepository photographyRepository) : base(mapper, photographyRepository) { }
    }
}
