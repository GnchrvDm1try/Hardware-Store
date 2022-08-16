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
        public async Task<IActionResult> GetProduct(int id) {
            return Ok(await context.Products.FirstOrDefaultAsync(p => p.Id == id));
        }
    }
}