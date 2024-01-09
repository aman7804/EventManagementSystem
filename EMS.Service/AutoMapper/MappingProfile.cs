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
            CreateMap<BookingEntity, BookingDTO>().ReverseMap();
            CreateMap<BookingEntity, GetBookingDTO>()
                .ForMember(x => x.packageDetail.VenueName, opt=> opt.MapFrom(y => y.Package.Venue.Name))
                .ForMember(x => x.packageDetail.VenueAdd, opt=> opt.MapFrom(y => y.Package.Venue.Add))
                .ForMember(x => x.packageDetail.VenueDescription, opt=> opt.MapFrom(y => y.Package.Venue.Description))
                .ForMember(x => x.packageDetail.VenuePrice, opt=> opt.MapFrom(y => y.Package.Venue.Price))
                .ForMember(x => x.packageDetail.MinCapacity, opt=> opt.MapFrom(y => y.Package.Venue.MinCapacity))
                .ForMember(x => x.packageDetail.MaxCapacity, opt=> opt.MapFrom(y => y.Package.Venue.MaxCapacity))
                .ForMember(x => x.packageDetail.CityId, opt=> opt.MapFrom(y => y.Package.Venue.CityId))
                .ForMember(x => x.packageDetail.PhotographyName, opt=> opt.MapFrom(y => y.Package.Photography.Name))
                .ForMember(x => x.packageDetail.PhotographyPrice, opt=> opt.MapFrom(y => y.Package.Photography.Price))
                .ForMember(x => x.packageDetail.PhotographyDescription, opt=> opt.MapFrom(y => y.Package.Photography.Description))
                .ForMember(x => x.packageDetail.DecorationName, opt=> opt.MapFrom(y => y.Package.Decoration.Name))
                .ForMember(x => x.packageDetail.DecorationPrice, opt=> opt.MapFrom(y => y.Package.Decoration.Price))
                .ForMember(x => x.packageDetail.DecorationDescription, opt=> opt.MapFrom(y => y.Package.Decoration.Description))
                .ForMember(x => x.packageDetail.CateringName, opt=> opt.MapFrom(y => y.Package.Catering.Name))
                .ForMember(x => x.packageDetail.CateringPrice, opt=> opt.MapFrom(y => y.Package.Catering.Price))
                .ForMember(x => x.packageDetail.CateringDescription, opt=> opt.MapFrom(y => y.Package.Catering.Description))
        }
    }
}
