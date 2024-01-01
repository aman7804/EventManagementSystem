using EMS.Entity.Base;
using Microsoft.EntityFrameworkCore;

namespace EMS.Entity.Entity
{
    [Index(nameof(MobileNo), nameof(Email), IsUnique = true)]
    public class PhotographyEntity : BaseVendorEntity
    {
    }
}
