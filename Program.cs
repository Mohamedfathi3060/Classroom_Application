
using Classroom.Models;
using classroomApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace classroomApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.


            //builder.Services.AddIdentity<User, IdentityRole>().AddEntityFrameworkStores<ApplicationDB>();
            builder.Services.AddIdentity<User, IdentityRole<int>>()
            .AddEntityFrameworkStores<ApplicationDB>()
            .AddDefaultTokenProviders();


            // Adding Jwt auth to our App
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                // options.DefaultScheme= JwtBearerDefaults.AuthenticationScheme;
            }
             ).AddJwtBearer(options =>
             {
                 options.SaveToken = true;
                 options.RequireHttpsMetadata = true;
                 options.TokenValidationParameters = new TokenValidationParameters()
                 {
                     ValidateIssuer = true,
                     ValidIssuer = "http://localhost:5057",
                     ValidateAudience = true,
                     ValidAudience = "http://localhost:5057",
                     IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecretKey"]))
                 };

             }
             );


            builder.Services.AddControllers();
            builder.Services.AddDbContext<ApplicationDB>(
                parm =>
                {
                    parm.UseSqlServer(builder.Configuration.GetConnectionString("any"));

                }
            );
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();




            // CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();                  // Allow all HTTP methods (GET, POST, etc.)
            });
            });


            var app = builder.Build();

            app.UseCors("AllowAll");


            //Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
