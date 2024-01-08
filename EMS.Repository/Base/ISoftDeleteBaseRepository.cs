using EMS.Entity.Base;

namespace EMS.Repository.Base
{
    public interface ISoftDeleteBaseRepository<T> : IBaseRepository<T> where T : SoftDeleteBaseEntity { }
}
