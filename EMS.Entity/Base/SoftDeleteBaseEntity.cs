namespace EMS.Entity.Base
{
    public class SoftDeleteBaseEntity : BaseEntity
    {
        public bool IsDeleted { get; set; }
        public int? DeletedBy { get; set; }
    }
}
