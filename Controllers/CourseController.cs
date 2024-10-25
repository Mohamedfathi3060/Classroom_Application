using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Classroom.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Text.Json.Serialization;
using System.Text.Json;
using classroomApi.DTO;


namespace classroomApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ApplicationDB DB;
        public CourseController(ApplicationDB DB)
        {
            this.DB = DB;
        }

        [HttpGet]
        public IActionResult GetAll()
        {

            var s_user_id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (s_user_id == null)
            {
                return BadRequest(new
                {
                    status = "error",
                    id = s_user_id,
                    messaage = "wrong token"
                });
            }

            // get User ID
            int UserId = int.Parse(s_user_id);

            

            // Query DB to get courses
            var Data = (from enrollemt in DB.CourseEnrollments
                        join course in DB.Courses
                        on enrollemt.CourseId equals course.Id
                        where enrollemt.UserId == UserId
                        select new
                        {
                            course_id = course.Id,
                            course_description = course.Description,
                            course_createAt = course.CreatedAt,
                            course_Title = course.Title,
                            course_teacher_id = course.TeacherId,
                            enroll_date = enrollemt.EnrolledAt
                        });
            // return JSON with Data
            //List<Course> Data = DB.Courses.ToList();


            return Ok(new { status = "success" , data = Data, user = UserId });

        }

        [HttpGet("{courseId:int}",Name ="course")]
        public IActionResult getCourseById(int courseId)
        {
            // Fetch the course along with its posts and each post's comments
            var course = DB.Courses
    .Where(c => c.Id == courseId)
    .Select(c => new
    {
        c.Id,
        c.Title,
        c.Description,
        Teacher = new
        {
            c.User.Id,
            c.User.Image,
            c.User.FirstName,
            c.User.LastName,
            c.User.Email,
        }
    })
    .FirstOrDefault();


            // Check if the course is found
            if (course == null)
            {
                return NotFound("Course not found.");
            }
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve,
                WriteIndented = true
            };

            var courseJson = JsonSerializer.Serialize(course, options);
            return Content(courseJson, "application/json");



        }

        [HttpPost]
        public IActionResult CreateCourse([FromBody] Course course)
        {
            if (ModelState.IsValid)
            {

                var s_user_id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (s_user_id == null)
                {
                    return BadRequest(new
                    {
                        status = "error",
                        id = s_user_id,
                        messaage = "wrong token"
                    });
                }
                int UserId = int.Parse(s_user_id);


                course.TeacherId = UserId;
                if(course.Description == null)
                {
                    course.Description = "";
                }
                if (course.Image == null)
                {
                    course.Image = "http";
                }
                DB.Courses.Add(course);
                DB.SaveChanges();

                // Create a course enrollment record
                CourseEnrollment enrollment = new CourseEnrollment
                {
                    UserId = UserId,
                    CourseId = course.Id,
                    Role = "Teacher",
                    EnrolledAt = DateTime.Now,
                };
                DB.CourseEnrollments.Add(enrollment);
                DB.SaveChanges();

                // Return the created course
                return Created("", new {message = "course created" });
            }
            return BadRequest(course);
        }

    }
}
