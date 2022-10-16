using Hardware_Store_App.Models;
using Hardware_Store_App.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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

        [HttpGet("isUserExists/{email:}")]
        public async Task<bool> IsUserExists(string email)
        {
            User? user = await context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user is not null)
                return true;
            return false;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userFromDb = await context.Users
                .Where(u => u.Email == model.Email && u.Hashedpassword == PasswordHasher.HashPassword(model.Password))
                .FirstOrDefaultAsync();
            if (userFromDb is null) return BadRequest("Email or password is incorrect");

            string role = context.Roles.Where(r => r.Id == userFromDb.Roleid).First().Name;

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["SecretKey"]));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(
                issuer: "https://localhost:7254",
                audience: "https://localhost:7254",
                claims: new List<Claim>()
                {
                        new Claim("id", userFromDb.Id.ToString()),
                        new Claim("role", role),
                },
                expires: DateTime.Now.AddDays(7),
                signingCredentials: signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(tokenString);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await context.Users.Where(u => u.Email == model.Email).FirstOrDefaultAsync();

            if (user is not null) return BadRequest("The user with such email is already exists");

            if (model.PhoneNumber is not null)
            {
                user = await context.Users.Where(u => u.Phonenumber == model.PhoneNumber).FirstOrDefaultAsync();
                if (user is not null) return BadRequest("The user with such phone number is already exists");
            }

            await context.Users.AddAsync(new User(model));
            await context.SaveChangesAsync();

            return Ok("The user has been successfully created");
        }
    }
}