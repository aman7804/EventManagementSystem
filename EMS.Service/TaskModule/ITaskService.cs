using EMS.Entity;
using EMS.Service.Base;
using EMS.Service.DTO;

namespace EMS.Service.TaskModule
{
    public interface ITaskService : IBaseService<TaskEntity, TaskDTO>
    {
        Task<bool> DeletePackage(int Id, int CurrentUser);
        Task<List<TaskDTO>> GetAllTask(int CurrentUser);
    }
}
