using EMS.Entity.Base;
using EMS.Service.Base;
using Microsoft.AspNetCore.Mvc;
using EMS.Service.DTO;

namespace EMS.Api.Controllers
{
    [ApiController]
    public class BaseController<T, D> : ControllerBase where T : BaseEntity where D : BaseDTO
    {
        public readonly IBaseService<T, D> _baseService;

        public BaseController(IBaseService<T, D> baseService)
        {
            _baseService = baseService;
        }

        [NonAction]
        public async Task<IActionResult> Save(D dto)
        {

            try
            {
                if (dto.Id == 0)
                {
                    await _baseService.AddAsync(dto);
                    return Ok("Created Successfully");
                }
                else
                {
                    await _baseService.UpdateAsync(dto);
                    return Ok("Updated Successfully");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                if(ex.InnerException != null)
                {
                    Console.WriteLine(ex.InnerException.Message);
                    return BadRequest(ex.InnerException.Message);
                }
                return BadRequest(ex.Message);
            }
        }

    }
}
