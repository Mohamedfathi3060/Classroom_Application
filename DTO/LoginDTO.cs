using System.ComponentModel.DataAnnotations;

namespace classroomApi.DTO
{
    public class LoginDTO
    {
        [Required]
        public string Email { get; set; }
        [Required]
        [MinLength(8)]
        public string Password { get; set; }
    }
}
