using Classroom.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;


namespace classroomApi.Controllers
{   
    [Route("api/course/{courseID}/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly ApplicationDB DB;
        public PostController(ApplicationDB DB)
        {
            this.DB = DB;
        }
        [HttpGet]
        public IActionResult GetPostsForCourse([FromRoute] int courseID)
        {
            // check User is subscriped here in this course

            // Query DB to get courses
            var Data = (from posts in DB.Posts
                        where posts.CourseId == courseID
                        select new
                        {
                            post_id = posts.Id,
                            post_course_id = posts.CourseId,
                            post_createAt = posts.CreatedAt,
                            post_last_update = posts.UpdatedAt,
                            post_content = posts.Content,
                            post_direct_pub = new
                            {
                                user_id = posts.User.Id,
                                user_name = posts.User.FirstName +" "+ posts.User.LastName,
                                user_email = posts.User.Email,
                                user_role = posts.User.Role,
                            }
                        });

            if (Data.IsNullOrEmpty())
            {
                return BadRequest(new
                {
                    message = "Course Not Found!",
                    status = "error"
                });
            }
            return Ok(Data);
        }

        [HttpPost]
        public IActionResult CreatePost([FromRoute] int courseID, [FromBody] Post postBody)
        {

            // 1) get User ID from token 
            int userId = 11;
            // 2) get course ID from URI
            // 3) validate post
            // 4) save the post
            postBody.UserId = userId;
            postBody.CourseId = courseID;
            postBody.CreatedAt = DateTime.Now;

            if(postBody.Content == null)
            {
                return BadRequest(new
                {
                    message = "Invalid Post!",
                    status = "error"
                });
            }

            DB.Posts.Add(postBody);
            DB.SaveChanges();
            return Created("/",new
            {
                message = $"Post created for course with ID {courseID}"
            });
        }
    }
}
