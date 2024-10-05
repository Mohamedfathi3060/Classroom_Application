using System.ComponentModel.DataAnnotations;

namespace Classroom.Models
{
    public class Course
    {
        
        

        public int Id { get; set; }
        [Required]

        public int TeacherId { get; set; }
        [Required]
        [MaxLength(56)]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        // RelationShips
        
        public List<CourseEnrollment>? Enrollments { get; set; }
        public List<Post>? posts { get; set; }   
    }
}
