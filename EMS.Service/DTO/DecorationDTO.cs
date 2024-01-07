﻿namespace EMS.Service.DTO
{
    public class DecorationDTO : BaseDTO
    {
        public string Name { set; get; } = string.Empty!;
        public decimal Price { set; get; }
        public string Description { set; get; } = string.Empty!;
        public bool IsActive { set; get; }
    }
}