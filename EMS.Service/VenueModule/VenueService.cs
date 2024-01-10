﻿using AutoMapper;
using EMS.Entity;
using EMS.Repository.VenueModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using Microsoft.AspNetCore.Http;

namespace EMS.Service.VenueModule
{
    public class VenueService : BaseService<VenueEntity, VenueDTO>, IVenueService
    {
        public VenueService(IMapper mapper, IVenueRepository venueRepo) : base(mapper, venueRepo) { }
    }
}
