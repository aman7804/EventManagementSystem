using AutoMapper;
using EMS.Entity.Entity;
using EMS.Repository.Repository.PhotographyModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using Microsoft.AspNetCore.Http;

namespace EMS.Service.Services.PhotographyModule
{
    public class PhotographyService : BaseService<PhotographyEntity, PhotographyDTO>, IPhotographyService
    {
        public PhotographyService(IMapper mapper, IPhotographyRepository photographyRepository, IHttpContextAccessor contextAccessor) : base(mapper, photographyRepository, contextAccessor) { }
    }
}
