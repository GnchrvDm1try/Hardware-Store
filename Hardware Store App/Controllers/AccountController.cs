using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Hardware_Store_App.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using Hardware_Store_App.Services;

namespace Hardware_Store_App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly StoreContext context;
        private readonly IConfiguration configuration;

        public AccountController(StoreContext context, IConfiguration configuration)
        {
            this.context = context;
            this.configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userFromDb = await context.Users
            .Where(u => u.Email == model.Email && u.Hashedpassword == PasswordHasher.HashPassword(model.Password))
            .FirstOrDefaultAsync();
            if (userFromDb is null) return BadRequest("Email or password is incorrect");

            string role = context.Roles.Where(r => r.Id == userFromDb.Roleid).First().ToString()!;

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["SecretKey"]));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "https://localhost:7254",
                audience: "https://localhost:7254",
                claims: new List<Claim>()
                {
                        new Claim(ClaimTypes.Email, model.Email),
                        new Claim(ClaimTypes.Role, role)
                },
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            var JWTToken = new { JWTToken = tokenString };
            return Ok(JWTToken);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await context.Users.Where(u => u.Email == model.Email || u.Phonenumber == model.PhoneNumber).FirstOrDefaultAsync();

            if (user is not null && user.Phonenumber is not null) return BadRequest("User with such email or phone is already exists");

            await context.Users.AddAsync(new User(model));
            await context.SaveChangesAsync();

            return Ok(model);
        }
    }
}