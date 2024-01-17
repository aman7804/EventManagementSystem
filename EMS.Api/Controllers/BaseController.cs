using EMS.Entity.Base;
using EMS.Service.Base;
using Microsoft.AspNetCore.Mvc;
using EMS.Service.DTO;
using System.Net;
using EMS.Api.ViewModels;
using System.IdentityModel.Tokens.Jwt;

namespace EMS.Api.Controllers
{
    [ApiController]
    public class BaseController<T, D> : ControllerBase where T : BaseEntity where D : BaseDTO
    {
        public readonly IBaseService<T, D> _baseService;
        public int CurrentUser { get; }

        public BaseController(IBaseService<T, D> baseService, IHttpContextAccessor httpContextAccessor)
        {
            _baseService = baseService;
            var userIdClaim = httpContextAccessor.HttpContext?.User?.FindFirst(JwtRegisteredClaimNames.Name);
            
            CurrentUser = userIdClaim?.Value != null
                ? Convert.ToInt32(userIdClaim.Value) : 0;
        }

        protected IActionResult GetResult<T>(ApiResult<T> result) where T : class
        {
            if (result.IsSuccessStatusCode && result.Code == (int)HttpStatusCode.OK) return Ok(result);
            else if (result.Code == (int)HttpStatusCode.NotFound) return NotFound(result.Message);
            else return BadRequest(result.Message);
        }

        protected IActionResult GetResult<T>(T? _dto, HttpStatusCode _statusCode = HttpStatusCode.OK,Exception? ex = null) where T : class
        {
            ApiResult<T> result = new()
            {
                Data = _dto,
                Code = (int)_statusCode,
                Message = GetMessageByStatusCode(_statusCode)
            };
            if (ex != null)
                result.Message = ex.Message;
            
            return GetResult(result);
        }

        private static string GetMessageByStatusCode(HttpStatusCode _statusCode)
        {
            switch (_statusCode)
            {
                case HttpStatusCode.OK:
                    return "Success";
                case HttpStatusCode.Forbidden:
                    return "Unauthorised";
                case HttpStatusCode.NotFound:
                    return "Record Not Found";
                default:
                    return _statusCode.ToString();
            }
        }
    }
}
