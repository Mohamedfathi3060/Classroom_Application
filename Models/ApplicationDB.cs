using Microsoft.EntityFrameworkCore;

namespace Classroom.Models
{
    public class ApplicationDB : DbContext
    {
        public ApplicationDB() : base() { }
        public ApplicationDB(DbContextOptions option) : base(option) { }

        public virtual DbSet<User> Users{ set; get; }
        public virtual DbSet<Course> Courses { set; get; }
        public virtual DbSet<Post> Posts { set; get; }
        public virtual DbSet<Comment> Comments { set; get; }
        public virtual DbSet<CourseEnrollment> CourseEnrollments { set; get; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Data Source=GaGo;initial catalog=Classroom; integrated security=true; trustservercertificate=true");



        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User-Course relationship (1 to Many)
            modelBuilder.Entity<Post>()
                .HasOne(c => c.Course)
                .WithMany(u => u.posts)
                .HasForeignKey(c => c.CourseId)
                .OnDelete(DeleteBehavior.SetNull);

            // User-Post relationship (1 to Many)
            modelBuilder.Entity<Post>()
                .HasOne(p => p.User)
                .WithMany(u => u.posts)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            // Post-Comment relationship (1 to Many)
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Post)
                .WithMany(p => p.Comments)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.SetNull);

            // Comment-User relationship (1 to Many)
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany(u => u.comments)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<CourseEnrollment>()
                .HasOne(c => c.User)
                .WithMany(u => u.Enrollments)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<CourseEnrollment>()
                .HasOne(c => c.Course)
                .WithMany(u => u.Enrollments)
                .HasForeignKey(c => c.CourseId)
                .OnDelete(DeleteBehavior.SetNull);
        }

    }
}
