using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hardware_Store_App.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hardware_Store_App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly StoreContext context;

        public ProductController(StoreContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            return Ok(await context.Products.ToListAsync());
        }

        [HttpGet("{id:}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            return Ok(await context.Products
                .Include(p => p.Photos)
                .Include(p => p.Users)
                .Include(p => p.Category)
                .Include(p => p.Manufacturer)
                .Include(p => p.Specifications)
                .Include(p => p.Discounts)
                .Include(p => p.Countryproducer)
                .FirstOrDefaultAsync(p => p.Id == id));
        }

        [HttpGet("reviews/{productid:}")]
        public async Task<IActionResult> GetReviews(int productId)
        {
            return Ok(await context.Reviews
                .Where(r => r.Productid == productId)
                .Include(r => r.User)
                .ToListAsync());
        }
    }
}