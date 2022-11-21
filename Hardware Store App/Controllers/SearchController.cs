using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hardware_Store_App.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hardware_Store_App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase
    {
        private readonly StoreContext context;

        public SearchController(StoreContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Search(string value)
        {
            List<Product> searchedProducts =
                await context.Products
                    .Where(p => p.Name.ToLower().Contains(value.ToLower()))
                    .Include(p => p.Category)
                    .ToListAsync();
            return Ok(searchedProducts);
        }
    }
}