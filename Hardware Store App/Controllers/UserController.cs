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
    public class UserController : ControllerBase
    {
        private readonly StoreContext context;

        public UserController(StoreContext context)
        {
            this.context = context;
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<IActionResult> GetCurrentUser()
        {
            int id = Convert.ToInt32(HttpContext.User.FindFirst("id")!.Value);
            User? user = await this.context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user is null) return BadRequest("Couldn't find the user");
            return Ok(user);
        }

    }
}