using EMS.Service.DTO;
using EMS.Service.TaskModule;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EMS.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : BaseController
    {
        ITaskService service;
        public TaskController(ITaskService taskService, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor) =>
            service = taskService;

        [HttpPost("add")]
        public async Task<IActionResult> AddTask(TaskDTO dto)
        {
            await service.AddAsync(dto);
            return GetResult<TaskDTO>(null, HttpStatusCode.OK);
        }

        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteTask(int Id)
        {
            var isDeleted = await service.DeletePackage(Id, CurrentUser);
            return isDeleted
                ? GetResult<TaskDTO>(null, HttpStatusCode.OK)
                : Unauthorized(new { message = "Unauthorized" });
        }

        [HttpGet("get-all-tasks")]
        public async Task<IActionResult> GetAllTask() =>
            GetResult(await service.GetAllTask(CurrentUser));
    }
}
