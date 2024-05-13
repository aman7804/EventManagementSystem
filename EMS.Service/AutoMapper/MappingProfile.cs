using AutoMapper;
using EMS.Entity;
using EMS.Service.DTO;
using EMS.Service.DTO.Booking;

namespace EMS.Service.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserEntity, UserDTO>().ReverseMap();
            CreateMap<RegisterDTO, UserEntity>();
            CreateMap<RegisterDTO, UserDTO>();
            CreateMap<SaveUserDTO, UserDTO>();
            CreateMap<SaveUserDTO, RegisterDTO>();
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
                .ForMember(x => x.VenueAddress, opt => opt.MapFrom(y => y.Venue.Address))
                .ForMember(x => x.CateringName, opt => opt.MapFrom(y => y.Catering.Name))
                .ForMember(x => x.CateringDescription, opt => opt.MapFrom(y => y.Catering.Description))
                .ForMember(x => x.DecorationName, opt => opt.MapFrom(y => y.Decoration.Name))
                .ForMember(x => x.DecorationDescription, opt => opt.MapFrom(y => y.Decoration.Description))
                .ForMember(x => x.PhotographyName, opt => opt.MapFrom(y => y.Photography.Name))
                .ForMember(x => x.PhotographyDescription, opt => opt.MapFrom(y => y.Photography.Description));
            CreateMap<BookingEntity, BookingDTO>()
                .ForMember(x => x.PackageName, opt => opt.MapFrom(y => y.Package.Name))
                .ForMember(x => x.CustomerName, opt => opt.MapFrom(n => n.Customer.FirstName + " " + n.Customer.LastName))
                .ForMember(x => x.CustomerFirstName, opt => opt.MapFrom(u => u.Customer.FirstName))
                .ForMember(x => x.CustomerLastName, opt => opt.MapFrom(u => u.Customer.LastName))
                .ForMember(x => x.CustomerEmailId, opt => opt.MapFrom(u => u.Customer.EmailId))
                .ForMember(x => x.CustomerMobileNo, opt => opt.MapFrom(u => u.Customer.MobileNo))
                .ForMember(x => x.VenueName, opt => opt.MapFrom(p => p.Package.Venue.Name))
                .ForMember(x => x.PhotographyName, opt => opt.MapFrom(p => p.Package.Photography.Name))
                .ForMember(x => x.CateringName, opt => opt.MapFrom(p => p.Package.Catering.Name))
                .ForMember(x => x.DecorationName, opt => opt.MapFrom(p => p.Package.Decoration.Name));
            CreateMap<SaveBookingDTO, BookingEntity>().ReverseMap();
            CreateMap<BookingEntity, GetBookingDTO>()
				.ForMember(x => x.CustomerName, opt => opt.MapFrom(n => n.Customer.FirstName + " " + n.Customer.LastName))
				.ForPath(x => x.PackageDetail.VenueName, opt=> opt.MapFrom(y => y.Package.Venue.Name))
                .ForPath(x => x.PackageDetail.VenueAddress, opt=> opt.MapFrom(y => y.Package.Venue.Address))
                .ForPath(x => x.PackageDetail.VenueDescription, opt=> opt.MapFrom(y => y.Package.Venue.Description))
                .ForPath(x => x.PackageDetail.VenuePrice, opt=> opt.MapFrom(y => y.Package.Venue.Price))
                .ForPath(x => x.PackageDetail.MinCapacity, opt=> opt.MapFrom(y => y.Package.Venue.MinCapacity))
                .ForPath(x => x.PackageDetail.MaxCapacity, opt=> opt.MapFrom(y => y.Package.Venue.MaxCapacity))
                .ForPath(x => x.PackageDetail.CityId, opt=> opt.MapFrom(y => y.Package.Venue.CityId))
                .ForPath(x => x.PackageDetail.PhotographyName, opt=> opt.MapFrom(y => y.Package.Photography.Name))
                .ForPath(x => x.PackageDetail.PhotographyPrice, opt=> opt.MapFrom(y => y.Package.Photography.Price))
                .ForPath(x => x.PackageDetail.PhotographyDescription, opt=> opt.MapFrom(y => y.Package.Photography.Description))
                .ForPath(x => x.PackageDetail.DecorationName, opt=> opt.MapFrom(y => y.Package.Decoration.Name))
                .ForPath(x => x.PackageDetail.DecorationPrice, opt=> opt.MapFrom(y => y.Package.Decoration.Price))
                .ForPath(x => x.PackageDetail.DecorationDescription, opt=> opt.MapFrom(y => y.Package.Decoration.Description))
                .ForPath(x => x.PackageDetail.CateringName, opt=> opt.MapFrom(y => y.Package.Catering.Name))
                .ForPath(x => x.PackageDetail.CateringPrice, opt=> opt.MapFrom(y => y.Package.Catering.PricePerPlate))
                .ForPath(x => x.PackageDetail.CateringDescription, opt=> opt.MapFrom(y => y.Package.Catering.Description));
            CreateMap<PackageEntity, PackageFullDTO>()
				.ForPath(x => x.VenueId, opt=> opt.MapFrom(y => y.Venue.Id))
				.ForPath(x => x.VenueName, opt=> opt.MapFrom(y => y.Venue.Name))
                .ForPath(x => x.VenueAddress, opt=> opt.MapFrom(y => y.Venue.Address))
                .ForPath(x => x.VenueDescription, opt=> opt.MapFrom(y => y.Venue.Description))
                .ForPath(x => x.VenuePrice, opt=> opt.MapFrom(y => y.Venue.Price))
                .ForPath(x => x.MinCapacity, opt=> opt.MapFrom(y => y.Venue.MinCapacity))
                .ForPath(x => x.MaxCapacity, opt=> opt.MapFrom(y => y.Venue.MaxCapacity))
                .ForPath(x => x.CityId, opt=> opt.MapFrom(y => y.Venue.CityId))
				.ForPath(x => x.PhotographyId, opt=> opt.MapFrom(y => y.Photography.Id))
                .ForPath(x => x.PhotographyName, opt=> opt.MapFrom(y => y.Photography.Name))
                .ForPath(x => x.PhotographyPrice, opt=> opt.MapFrom(y => y.Photography.Price))
                .ForPath(x => x.PhotographyDescription, opt=> opt.MapFrom(y => y.Photography.Description))
				.ForPath(x => x.DecorationId, opt=> opt.MapFrom(y => y.Decoration.Id))
                .ForPath(x => x.DecorationName, opt=> opt.MapFrom(y => y.Decoration.Name))
                .ForPath(x => x.DecorationPrice, opt=> opt.MapFrom(y => y.Decoration.Price))
                .ForPath(x => x.DecorationDescription, opt=> opt.MapFrom(y => y.Decoration.Description))
				.ForPath(x => x.CateringId, opt=> opt.MapFrom(y => y.Catering.Id))
                .ForPath(x => x.CateringName, opt=> opt.MapFrom(y => y.Catering.Name))
                .ForPath(x => x.CateringPrice, opt=> opt.MapFrom(y => y.Catering.PricePerPlate))
                .ForPath(x => x.CateringDescription, opt=> opt.MapFrom(y => y.Catering.Description));
        }
    }
}
