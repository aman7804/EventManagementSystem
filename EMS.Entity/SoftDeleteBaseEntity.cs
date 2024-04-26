namespace EMS.Entity
{
    public class SoftDeleteBaseEntity : BaseEntity
    {
        public bool IsDeleted { get; set; }
        public int? DeletedBy { get; set; }
    }
}
