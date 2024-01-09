﻿using AutoMapper;
using EMS.Entity.Entity;
using EMS.Repository.Repository.StateModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using Microsoft.AspNetCore.Http;
using System.Security.Authentication;

namespace EMS.Service.Services.StateModule
{
    public class StateService : BaseService<StateEntity, StateDTO>, IStateService
    {
        public StateService(IMapper mapper, IStateRepository stateRepo, IHttpContextAccessor contextAccessor) : base(mapper, stateRepo, contextAccessor) { }

        private static bool IsStateValid(string stateName) => stateName.Length > 2;
        public override async Task AddAsync(StateDTO dto)
        {
            if (!IsStateValid(dto.Name))
                throw new InvalidCredentialException("Invalid State Name.");
            
            await base.AddAsync(dto);
        }
    }
}
