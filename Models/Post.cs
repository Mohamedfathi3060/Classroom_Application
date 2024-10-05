using System.ComponentModel.DataAnnotations.Schema;

namespace Classroom.Models
{
    public class Post
    {
        public int Id { get; set; }
        [ForeignKey("Course")]
        public int? CourseId { get; set; }
        [ForeignKey("User")]
        public int? UserId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        // RelationShips

        public User? User { get; set; }
        public Course? Course { get; set; }
        public List<Comment>? Comments { get; set; }
    }
}
