﻿using EMS.Entity.Base;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EMS.Entity
{
    [Index(nameof(Name), IsUnique = true)]
    public class PhotographyEntity : BaseEntity
    {
        [Required, StringLength(100)]
        public string Name { set; get; } = string.Empty!;

        [Required, Column(TypeName = "decimal(18,2)")]
        public decimal Price { set; get; }

        [Required, StringLength(250)]
        public string Description { set; get; } = string.Empty!;
        public bool? IsActive { set; get; }

        public virtual IList<PackageEntity> Packages { get; set; } = null!;
    }
}
