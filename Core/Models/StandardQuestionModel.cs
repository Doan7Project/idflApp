﻿using idflApp.Core.Models.Interfaces;

namespace idflApp.Core.Models
{
    public class StandardQuestionModel : BaseInterface
    {
        public string? Question { get; set; }
        public string? Description { get; set; }
        public bool IsActive { get; set; }
        public Guid? StandardId { get; set; }
        public StandardModel? StandardModel { get; set; }
    }
}
