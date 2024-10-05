using System.ComponentModel.DataAnnotations.Schema;

namespace Classroom.Models
{
    public class Comment
    {
        public int Id { get; set; }
        [ForeignKey("Post")]
        public int? PostId { get; set; }
        [ForeignKey("User")]
        public int? UserId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        // RelationShips
        public User? User { get; set; }
        public Post? Post { get; set; }
    }
}
