using EMS.Entity;

namespace EMS.Repository.Base
{
    public interface ISoftDeleteBaseRepository<T> : IBaseRepository<T> where T : SoftDeleteBaseEntity
    {
    }
}
