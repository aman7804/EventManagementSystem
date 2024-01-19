using AutoMapper;
using EMS.Entity;
using EMS.Repository.TaskModule;
using EMS.Service.Base;
using EMS.Service.DTO;
using EMS.Shared.Constant;

namespace EMS.Service.TaskModule
{
    public class TaskService : BaseService<TaskEntity, TaskDTO>,ITaskService
    {
        ITaskRepository _taskRepo;
        public TaskService(IMapper mapper, ITaskRepository taskRepo) : base(mapper, taskRepo) =>
            _taskRepo = taskRepo;

        public async Task<bool> DeletePackage(int Id, int CurrentUser)
        {
            var package = await Repo.GetByIdAsync(Id)
                ?? throw new Exception(ExceptionMessage.RECORD_NOT_FOUND);
            if (package.CreatedBy != CurrentUser)
                return false;
            await _taskRepo.DeletePackage(package);
            return true;
        }

        public async Task<List<TaskDTO>> GetAllTask(int CurrentUser)
        {
            var tasks = Repo.GetAll(x => x.CreatedBy == CurrentUser).ToList();
            return Map<List<TaskEntity>, List<TaskDTO>>(tasks);

        }
    }
}
