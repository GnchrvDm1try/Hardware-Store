using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Hardware_Store_App.Models;
using Hardware_Store_App.Models.Enums;

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
                .Include(u => u.Reviews)
                .ThenInclude(r => r.Product)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user is null) return BadRequest("Couldn't find the user");

            user.Orders = await context.Orders.Where(o => o.Userid == user.Id)
                .Include(o => o.Status)
                .Include(o => o.Orderproducts)
                .ThenInclude(p => p.Product)
                .ThenInclude(p => p.Category).AsNoTracking()
                .OrderByDescending(o => o.Orderdate)
                .ToListAsync();

            user.Wishlists = await context.Wishlists.Where(w => w.Userid == user.Id)
                .Include(w => w.Product)
                .ThenInclude(p => p.Category).AsNoTracking()
                .OrderByDescending(w => w.Additiondate)
                .ToListAsync();
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

        [HttpPatch("updateOrder")]
        public async Task<IActionResult> UpdateOrder([FromBody] Order order)
        {
            Order? orderFromDB = await context.Orders.AsNoTracking().FirstOrDefaultAsync(o => o.Id == order.Id);
            if (orderFromDB is null) return BadRequest("Couldn't find order");

            order.Userid = orderFromDB.Userid;
            int userId = Convert.ToInt32(HttpContext.User.FindFirst("id")!.Value);
            if (order.Userid != userId) return Unauthorized("Inappropriate user");

            if (order.Statusid == 0)
                order.Statusid = orderFromDB.Statusid;
            else if (order.Statusid != (int)OrderStatuses.Canceled)
                return BadRequest("You are allowed to set only canceled status (statusid = 1)");
            
            order.Orderdate = orderFromDB.Orderdate;

            context.Orders.Update(order);
            await context.SaveChangesAsync();

            return Ok("Order has been successfully updated");
        }

        [HttpPost("toggleWishlistItem")]
        public async Task<IActionResult> ToggleWishlistItem([FromBody] int productId)
        {
            Product? product = await context.Products.FindAsync(productId);
            if (product is null)
                return BadRequest("There is no product with such id");

            int id = Convert.ToInt32(HttpContext.User.FindFirst("id")!.Value);
            User? currentUser = await context.Users.Include(u => u.Wishlists).AsNoTracking().FirstAsync(u => u.Id == id);
            Wishlist? wishlistItem = currentUser.Wishlists.FirstOrDefault(w => w.Productid == productId);
            if (wishlistItem is null)
                await context.Wishlists.AddAsync(new Wishlist
                {
                    Userid = currentUser.Id,
                    Productid = productId,
                });
            else
                context.Wishlists.Remove(wishlistItem);
            await context.SaveChangesAsync();
            return Ok("Wishlist item has been successfully toggled");
        }
    }
}
