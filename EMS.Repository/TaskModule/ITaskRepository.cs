using EMS.Entity;
using EMS.Repository.Base;

namespace EMS.Repository.TaskModule
{
    public interface ITaskRepository : IBaseRepository<TaskEntity>
    {
        Task DeletePackage(TaskEntity entity);
    }
}
