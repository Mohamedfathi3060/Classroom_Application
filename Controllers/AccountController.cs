using Classroom.Models;
using classroomApi.DTO;
using classroomApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace classroomApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly IConfiguration iconfig;
        public AccountController(UserManager<User> user,IConfiguration configuration)
        {
            this.userManager = user;
            this.iconfig = configuration;
        }
        [HttpPost("register")]  
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            if (ModelState.IsValid)
            {

                // Create a new User instance
                User user = new User
                {
                    FirstName = registerDTO.FirstName,
                    LastName = registerDTO.LastName,
                    Email = registerDTO.Email,
                    UserName = registerDTO.Email
                };

                var result = await userManager.CreateAsync(user, registerDTO.Password);
                
                if (result.Succeeded)
                {
                    return Ok(new { status = "success" , Message = "User registered successfully." });
                }
                else
                {
                    return BadRequest(new { status = "error" , Message = "Invalid email or password" });
                }
            }

            return BadRequest(new { status = "error" , Message = "Invalid Data" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            if (ModelState.IsValid)
            {
                var user = await userManager.FindByEmailAsync(loginDTO.Email);
                if (user == null)
                {
                    return Unauthorized(new { status = "error" , Message = "Invalid email or password."});
                }

                var passwordValid = await userManager.CheckPasswordAsync(user, loginDTO.Password);
                if (!passwordValid)
                {
                    return Unauthorized(new { status = "error", Message = "Invalid email or password." });
                }

                var token = await GenerateJwtToken(user);

                return Ok(new { status = "success",  Token = token });
            }

            return BadRequest(new { status = "error",  Message = ModelState });
        }

        [HttpGet("me")]
        public async Task<IActionResult> me()
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
            //int UserId = int.Parse(s_user_id);
            var user = await userManager.FindByIdAsync(s_user_id);
            if (user == null)
            {
                return Unauthorized(new { status = "error", Message = "Invalid email or password." });
            }
            return Ok(new { 
                status = "success",
                user_first_name = user.FirstName ,
                user_last_name  = user.LastName,
                user_email = user.Email
            });
        }

        // CREATE JWT TOKEN
        private async Task<string> GenerateJwtToken(User user)
        {

            var claims = new List<Claim>
            {
                //new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(iconfig["JwtSettings:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: iconfig["JwtSettings:Issuer"],
                audience: iconfig["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(24),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
