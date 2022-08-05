using System;
using System.Collections.Generic;

namespace Hardware_Store_App.Models
{
    public partial class Review
    {
        public int Id { get; set; }
        public string Comment { get; set; } = null!;
        public DateTime Reviewdate { get; set; }
        public decimal Estimation { get; set; }
        public int? Userid { get; set; }
        public int? Productid { get; set; }

        public virtual Product? Product { get; set; }
        public virtual User? User { get; set; }
    }
}
