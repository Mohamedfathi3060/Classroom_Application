using System.ComponentModel.DataAnnotations.Schema;

namespace Classroom.Models
{
    public class CourseEnrollment
    {
        public int Id { get; set; }
        [ForeignKey("User")]
        public int? UserId { get; set; }
        [ForeignKey("Course")]
        public int? CourseId { get; set; }
        public DateTime EnrolledAt { get; set; } = DateTime.Now;

        // RelationShips
        public User? User { get; set; }
        public Course? Course { get; set; }

    }
}
