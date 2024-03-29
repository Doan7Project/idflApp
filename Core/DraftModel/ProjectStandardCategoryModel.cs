﻿using idflApp.Core.Models.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace idflApp.Core.DraftModel
{
    public class ProjectStandardCategoryModel : ContentModel
    {
        public bool IsActive { get; set; }
        public List<ProjectStandardModel>? ProjectStandardModels { get; set; }
    }
}
