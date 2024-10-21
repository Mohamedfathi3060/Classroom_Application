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
                    return Ok(new { Message = "User registered successfully." });
                }
                else
                {
                    return BadRequest(new { Message = result.Errors });
                }
            }

            return BadRequest(new { Message = ModelState });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            if (ModelState.IsValid)
            {
                var user = await userManager.FindByEmailAsync(loginDTO.Email);
                if (user == null)
                {
                    return Unauthorized(new { Message = "1 Invalid email or password." ,email= loginDTO.Email });
                }

                var passwordValid = await userManager.CheckPasswordAsync(user, loginDTO.Password);
                if (!passwordValid)
                {
                    return Unauthorized(new { Message = "2 Invalid email or password." });
                }

                var token = await GenerateJwtToken(user);

                return Ok(new { Token = token });
            }

            return BadRequest(ModelState);
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
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
