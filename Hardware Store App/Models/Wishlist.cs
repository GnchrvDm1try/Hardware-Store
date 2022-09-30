using System;
using System.Collections.Generic;

namespace Hardware_Store_App.Models
{
    public partial class Wishlist
    {
        public int Userid { get; set; }
        public int Productid { get; set; }
        public DateOnly Additiondate { get; set; }

        public virtual Product Product { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
