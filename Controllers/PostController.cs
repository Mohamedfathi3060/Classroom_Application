using Classroom.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;


namespace classroomApi.Controllers
{
    [Authorize]
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

            var s_user_id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (s_user_id == null)
            {
                return BadRequest(new
                {
                    id = s_user_id,
                    messaage = "wrong token"
                });
            }

            // 1) get User ID from token 
            int UserId = int.Parse(s_user_id);
            // 2) get course ID from URI
            // 3) validate post
            // 4) save the post
            postBody.UserId = UserId;
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
