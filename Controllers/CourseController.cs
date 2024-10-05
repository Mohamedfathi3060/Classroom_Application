using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Classroom.Models;
using Microsoft.EntityFrameworkCore;


namespace classroomApi.Controllers
{
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
            // get User ID
            int UserId = 11;


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


            return Ok(Data);

        }

        [HttpGet("{courseId:int}",Name ="course")]
        public IActionResult getCourseById(int courseId)
        {
            Course course = DB.Courses.FirstOrDefault(
                parm => parm.Id == courseId
               );
            return Ok(course);

        }

        [HttpPost]
        public IActionResult createCourse([FromBody] Course course)
        {

            if (ModelState.IsValid)
            {
                DB.Courses.Add(course);
                DB.SaveChanges();
                string url = Url.Link("course", new { id = course.Id });

                /* take User ID and add course enrollment record*/
               /* HERE
                * 
                *
                *
                *
                *
                *
                */

                return Created(url, course);
            }
            return BadRequest(course);

        }

    }
}
