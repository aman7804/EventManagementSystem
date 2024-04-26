﻿using AutoMapper;
using EMS.Entity;
using EMS.Repository.StateModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using System.Security.Authentication;

namespace EMS.Service.StateModule
{
    public class StateService : BaseService<StateEntity, StateDTO>, IStateService
    {
        public StateService(IMapper mapper, IStateRepository stateRepo) : base(mapper, stateRepo) { }

        private static bool IsStateValid(string stateName) => stateName.Length > 2;
        public override async Task AddAsync(StateDTO dto)
        {
            if (!IsStateValid(dto.Name))
                throw new InvalidCredentialException("Invalid State Name.");

            await base.AddAsync(dto);
        }
    }
}
