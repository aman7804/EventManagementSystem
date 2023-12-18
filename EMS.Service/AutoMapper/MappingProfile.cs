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
        }
    }
}
