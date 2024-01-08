using AutoMapper;
using EMS.Entity;
using EMS.Repository.Repository.VenueModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using Microsoft.AspNetCore.Http;

namespace EMS.Service.Services.VenueModule
{
    public class VenueService : BaseService<VenueEntity,VenueDTO>, IVenueService
    {
        public VenueService(IMapper mapper, IVenueRepository venueRepo, IHttpContextAccessor contextAccessor) : base(mapper, venueRepo, contextAccessor) { }
    }
}
