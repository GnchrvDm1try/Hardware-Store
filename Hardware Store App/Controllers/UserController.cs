using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Hardware_Store_App.Models;

namespace Hardware_Store_App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly StoreContext context;

        public UserController(StoreContext context)
        {
            this.context = context;
        }

        [HttpGet("currentUser")]
        public async Task<IActionResult> GetCurrentUser()
        {
            int id = Convert.ToInt32(HttpContext.User.FindFirst("id")!.Value);
            User? user = await this.context.Users
                .Include(u => u.Orders)!
                .ThenInclude(o => o.Status)
                .Include(u => u.Orders)!
                .ThenInclude(o => o.Orderproducts)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(u => u.Id == id);
            if (user is null) return BadRequest("Couldn't find the user");
            return Ok(user);
        }

        [HttpPatch("updateUserCredentials")]
        public async Task<IActionResult> UpdateUserCredentials([FromBody] EditModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            int id = Convert.ToInt32(HttpContext.User.FindFirst("id")!.Value);
            User? currentUser = await context.Users.AsNoTracking().FirstAsync(u => u.Id == id);
            User? user = await context.Users.Where(u => (u.Email == model.Email && u.Email != currentUser.Email) ||
                (u.Phonenumber == model.PhoneNumber && u.Phonenumber != currentUser.Phonenumber)).FirstOrDefaultAsync();
            if (user is not null)
            {
                if (user.Email == model.Email) return BadRequest("The user with such email is already exists");
                if (user.Phonenumber == model.PhoneNumber) return BadRequest("The user with such phone number is already exists");
            }

            user = new User(model);
            user.Id = id;
            if (String.IsNullOrEmpty(model.Password))
                user.Hashedpassword = currentUser.Hashedpassword;
            user.Registrationdate = currentUser.Registrationdate;
            context.Users.Update(user);
            await context.SaveChangesAsync();

            return Ok("Credentials has been successfully updated");
        }
    }
}
