namespace Classroom.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;



        // RelationShips
        public List<CourseEnrollment>? Enrollments { get; set; }
        public List<Post>? posts { get; set; }
        public List<Comment>? comments { get; set; }


    }
}
