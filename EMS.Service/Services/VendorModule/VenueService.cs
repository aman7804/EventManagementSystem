using AutoMapper;
using EMS.Entity;
using EMS.Repository.Repository.VenueModule;
using EMS.Service.Base;
using EMS.Service.DTO;

namespace EMS.Service.Services.VendorModule
{
    public class VenueService : BaseService<VenueEntity,VenueDTO>, IVenueService
    {
        public VenueService(IMapper mapper, IVenueRepository venueRepo) : base(mapper, venueRepo) { }
    }
}
