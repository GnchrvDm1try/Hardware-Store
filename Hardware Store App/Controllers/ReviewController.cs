using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    }
}