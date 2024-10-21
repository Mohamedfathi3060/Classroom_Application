using Microsoft.AspNetCore.Identity;

namespace Classroom.Models
{
    public class User : IdentityUser<int>
    {
        public string? Image { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;



        // RelationShips
        public List<CourseEnrollment>? Enrollments { get; set; }
        public List<Post>? posts { get; set; }
        public List<Comment>? comments { get; set; }
        public List<Course>? Teaching { get; set; }


    }
}
