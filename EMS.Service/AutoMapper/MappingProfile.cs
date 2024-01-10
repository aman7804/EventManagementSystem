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
            CreateMap<PackageDTO, PackageEntity>();
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
                .ForPath(x => x.packageDetail.VenueName, opt=> opt.MapFrom(y => y.Package.Venue.Name))
                .ForPath(x => x.packageDetail.VenueAdd, opt=> opt.MapFrom(y => y.Package.Venue.Add))
                .ForPath(x => x.packageDetail.VenueDescription, opt=> opt.MapFrom(y => y.Package.Venue.Description))
                .ForPath(x => x.packageDetail.VenuePrice, opt=> opt.MapFrom(y => y.Package.Venue.Price))
                .ForPath(x => x.packageDetail.MinCapacity, opt=> opt.MapFrom(y => y.Package.Venue.MinCapacity))
                .ForPath(x => x.packageDetail.MaxCapacity, opt=> opt.MapFrom(y => y.Package.Venue.MaxCapacity))
                .ForPath(x => x.packageDetail.CityId, opt=> opt.MapFrom(y => y.Package.Venue.CityId))
                .ForPath(x => x.packageDetail.PhotographyName, opt=> opt.MapFrom(y => y.Package.Photography.Name))
                .ForPath(x => x.packageDetail.PhotographyPrice, opt=> opt.MapFrom(y => y.Package.Photography.Price))
                .ForPath(x => x.packageDetail.PhotographyDescription, opt=> opt.MapFrom(y => y.Package.Photography.Description))
                .ForPath(x => x.packageDetail.DecorationName, opt=> opt.MapFrom(y => y.Package.Decoration.Name))
                .ForPath(x => x.packageDetail.DecorationPrice, opt=> opt.MapFrom(y => y.Package.Decoration.Price))
                .ForPath(x => x.packageDetail.DecorationDescription, opt=> opt.MapFrom(y => y.Package.Decoration.Description))
                .ForPath(x => x.packageDetail.CateringName, opt=> opt.MapFrom(y => y.Package.Catering.Name))
                .ForPath(x => x.packageDetail.CateringPrice, opt=> opt.MapFrom(y => y.Package.Catering.Price))
                .ForPath(x => x.packageDetail.CateringDescription, opt=> opt.MapFrom(y => y.Package.Catering.Description));
        }
    }
}
