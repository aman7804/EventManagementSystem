﻿using AutoMapper;
using EMS.Entity;
using EMS.Repository.UserModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using EMS.Shared;
using EMS.Service.Extension;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using EMS.Shared.Constant;

namespace EMS.Service.UserModule
{
    public class UserService : BaseService<UserEntity, UserDTO>, IUserService
    {
        public UserService(IMapper mapper, IUserRepository userRepository) : base(mapper, userRepository) { }

        public override async Task<PaginationDTO<UserDTO, F>>
            GetPageAsync<F>(PaginationDTO<UserDTO, F> paginationDTO)
        {
            Expression<Func<UserDTO, bool>> expression = paginationDTO.Filter.GetFilter();
            Expression<Func<UserEntity, bool>> where = Map<Expression<Func<UserDTO, bool>>, Expression<Func<UserEntity, bool>>>(expression);
            IQueryable<UserEntity> users = Repo.GetAll(where);
            users = users.Where(e => e.Role == EnumRole.Customer);

            paginationDTO.RecordCount = await users.CountAsync();
            paginationDTO.PageCount = (int)Math.Ceiling(
                (double)paginationDTO.RecordCount / paginationDTO.PageSize
            );

            if (!string.IsNullOrWhiteSpace(paginationDTO.SortByColumns))
            {
                if (paginationDTO.SortBy == EnumSortBy.Descending)
                    users = users.OrderByDescending(paginationDTO.SortByColumns);
                else
                    users = users.OrderBy(paginationDTO.SortByColumns);
            }

            users = users.Skip(paginationDTO.PageSize * (paginationDTO.PageNo - 1));
            users = users.Take(paginationDTO.PageSize);

            List<UserEntity> records = await users.ToListAsync();
            if (records.Count > 0)
                paginationDTO.Data = Map<List<UserEntity>, List<UserDTO>>(records);

            return paginationDTO;
        }

        public override async Task UpdateAsync(UserDTO dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto), "DTO cannot be null");

            UserEntity user = await Repo.GetByIdAsync(dto.Id, true)
                ?? throw new Exception(ExceptionMessage.RECORD_NOT_FOUND);
            
            UserEntity userEntity = Map<UserDTO, UserEntity>(dto);

            userEntity.Password = user.Password;
            userEntity.CreateDate = user.CreateDate;
            userEntity.CreatedBy = user.CreatedBy;
            userEntity.Role = user.Role;

            await Repo.UpdateAsync(userEntity); 
        }

    }
}
