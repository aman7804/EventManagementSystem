using AutoMapper;
using EMS.Entity;
using EMS.Repository.StateModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using System.Security.Authentication;

namespace EMS.Service.Services.StateModule
{
    public class StateService : BaseService<StateEntity, StateDTO>, IStateService
    {
        public StateService(IMapper mapper, IStateRepository stateRepo) : base(mapper, stateRepo) { }

            private static readonly string[] validStateNames = new[] {
            "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
            "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
            "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal" };

        private static bool IsStateValid(string stateName)
        {
            return validStateNames.Contains(stateName);
        }

        public override async Task AddAsync(StateDTO dto)
        {
            if (!IsStateValid(dto.Name))
            {
                throw new InvalidCredentialException("Invalid State Name.");
            }
            else { await base.AddAsync(dto); }
        }
    }
}
