using Core.Models;
using idflApp.Core.DraftModel;
using idflApp.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace idflApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<UserModel> User { get; set; }
        public DbSet<UserInformationModel> UserInformation { get; set; }
        public DbSet<ClientModel> Client { get; set; }
        public DbSet<ClientInfomationModel> ClientInformation { get; set; }
        public DbSet<AccountVerifyModel> AccountVerify { get; set; }
        public DbSet<BookCompleteModel> BookComplete { get; set; }
        public DbSet<FactoryModel> Factory { get; set; }
        public DbSet<StandardModel> Standard { get; set; }
        public DbSet<ProjectModel> Project { get; set; }
        //public DbSet<ProjectStandardModel> ProjectStandard { get; set; }
        //public DbSet<ProjectGeneralModel> ProjectGeneral { get; set; }
        public DbSet<BookModel> Book { get; set; }
        //public DbSet<ProjectStandardCategoryModel> ProjectStandardCategory { get; set; }
        //public DbSet<StandardQuestionModel> StandardQuestion { get; set; }
        //public DbSet<StandardAnswerModel> StandardAnswer{ get; set; }
        public DbSet<BookUserModel> BookUser { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder
        .EnableSensitiveDataLogging();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
             DataGenerator.Run(modelBuilder);
             RelationGenerator.Run(modelBuilder);
        }
    }
}