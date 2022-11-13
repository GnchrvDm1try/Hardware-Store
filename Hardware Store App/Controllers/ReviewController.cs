using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Hardware_Store_App.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hardware_Store_App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReviewController : ControllerBase
    {
        private readonly StoreContext context;

        public ReviewController(StoreContext context)
        {
            this.context = context;
        }

        [HttpPatch("edit")]
        public async Task<IActionResult> Edit([FromBody] Review review)
        {
            Review? reviewFromDB = await context.Reviews.AsNoTracking().FirstOrDefaultAsync(r => r.Id == review.Id);
            if (reviewFromDB is null) return BadRequest("Couldn't find review");

            int userId = Convert.ToInt32(HttpContext.User.FindFirst("id")!.Value);
            if (review.Userid != userId) return Unauthorized("Inappropriate user");

            review.Reviewdate = reviewFromDB.Reviewdate;

            context.Reviews.Update(review);
            await context.SaveChangesAsync();

            return Ok("Review has been successfully updated");
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> Delete([FromBody] int id)
        {
            Review? review = await context.Reviews.FindAsync(id);

            if (review is null) return BadRequest("Couldn't find review");

            context.Reviews.Remove(review);
            await context.SaveChangesAsync();
            return Ok("Review has been successfully deleted");
        }
    }
}
