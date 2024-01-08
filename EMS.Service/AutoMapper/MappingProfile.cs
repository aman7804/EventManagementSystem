using AutoMapper;
using EMS.Entity;
using EMS.Entity.Entity;
using EMS.Service.DTO;

namespace EMS.Service.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserEntity, UserDTO>().ReverseMap();
            CreateMap<StateEntity, StateDTO>().ReverseMap();
            CreateMap<CityEntity, CityDTO>().ReverseMap();
            CreateMap<VenueEntity, VenueDTO>().ReverseMap();
            CreateMap<DecorationEntity, DecorationDTO>().ReverseMap();
            CreateMap<CateringEntity, CateringDTO>().ReverseMap();
            CreateMap<PhotographyEntity, PhotographyDTO>().ReverseMap();
            CreateMap<PackageEntity, PackageDTO>()
                .ForMember(x => x.VenueName, opt => opt.MapFrom(y => y.Venue.Name))
                .ForMember(x => x.PhotographyName, opt => opt.MapFrom(y => y.Photography.Name))
                .ForMember(x => x.DecorationName, opt => opt.MapFrom(y => y.Decoration.Name))
                .ForMember(x => x.CateringName, opt => opt.MapFrom(y => y.Catering.Name));
            CreateMap<PackageEntity, PackageItemDTO>()
                .ForMember(x => x.VenueName, opt => opt.MapFrom(y => y.Venue.Name))
                .ForMember(x => x.VenueAddress, opt => opt.MapFrom(y => y.Venue.Add))
                .ForMember(x => x.CateringName, opt => opt.MapFrom(y => y.Catering.Name))
                .ForMember(x => x.CateringDescription, opt => opt.MapFrom(y => y.Catering.Description))
                .ForMember(x => x.DecorationName, opt => opt.MapFrom(y => y.Decoration.Name))
                .ForMember(x => x.DecorationDescription, opt => opt.MapFrom(y => y.Decoration.Description))
                .ForMember(x => x.PhotographyName, opt => opt.MapFrom(y => y.Photography.Name))
                .ForMember(x => x.PhotographyDescription, opt => opt.MapFrom(y => y.Photography.Description));
        }
    }
}
