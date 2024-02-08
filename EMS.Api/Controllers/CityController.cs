﻿using EMS.Service.CityModule;
using EMS.Service.DTO;
using EMS.Service.DTO.Filter;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : BaseController
    {
        private readonly ICityService service;
        public CityController(ICityService cityService, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor) =>
                service = cityService;

        [HttpPost("save")]
        public async Task<IActionResult> SaveCity(CityDTO dto)
        {
            if (dto.Id == 0)
                await service.AddAsync(dto);
            else
                await service.UpdateAsync(dto);
            return GetResult<CityDTO>(null, HttpStatusCode.OK);
        }

        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteCity(int Id)
        {
            await service.DeleteAsync(Id);
            return GetResult<CityDTO>(null, HttpStatusCode.OK);
        }

        [HttpGet("index/{Id}")]
        public async Task<IActionResult> Index(int Id) =>
            GetResult(await service.GetByIdAsync(Id));

        [HttpPost("list")]
        public async Task<IActionResult> List(PaginationDTO<CityDTO, CityFilter> pagination) =>
            GetResult(await service.GetPageAsync(pagination));

        [AllowAnonymous]
        [HttpGet("drop-down-list/{stateId?}")]
        public async Task<IActionResult> GetDropdownList(int stateId = 0)
        {
            return stateId == 0
                ? GetResult(await service.GetAllAsync(null))
                : GetResult(await service.GetAllAsync(x => x.StateId == stateId));
        }
    }
}