using Classroom.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace classroomApi.Controllers
{
    [Authorize]
    [Route("api/post/{postID}/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ApplicationDB DB;
        public CommentController(ApplicationDB DB)
        {
            this.DB = DB;
        }
        [HttpPost]
        public IActionResult CreateComment([FromRoute] int postID, [FromBody] Comment commentBody)
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
            // 3) validate comment
            // 4) save the comment
            commentBody.UserId = UserId;
            commentBody.PostId = postID;
            commentBody.CreatedAt = DateTime.Now;

            if (commentBody.Content == null)
            {
                return BadRequest(new
                {
                    message = "Invalid Cpmment!",
                    status = "error"
                });
            }
         

            DB.Comments.Add(commentBody);
            DB.SaveChanges();
            return Created("/", new
            {
                message = $"Comment created for Post with ID {postID}"
            });
        }


        [HttpGet]
        public IActionResult GetCommentsForPost([FromRoute] int postID)
        {
            // check User is subscriped here in this course

            // Query DB to get courses
            var Data = (from comments in DB.Comments
                        where comments.PostId == postID
                        select new
                        {
                            comment_id = comments.Id,
                            comment_course_id = comments.PostId,
                            comment_direct_pub = new
                            {
                                user_id = comments.User.Id,
                                user_name = comments.User.FirstName + " " + comments.User.LastName,
                                user_email = comments.User.Email,
                            },
                            comment_content = comments.Content,
                            comment_createAt = comments.CreatedAt,
                            comment_last_update = comments.UpdatedAt,
                            
                        });

            if (Data.IsNullOrEmpty())
            {
                return BadRequest(new
                {
                    message = "post Not Found!",
                    status = "error"
                });
            }
            return Ok(Data);
        }

    }
}
