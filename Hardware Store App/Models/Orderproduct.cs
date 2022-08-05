using System;
using System.Collections.Generic;

namespace Hardware_Store_App.Models
{
    public partial class Orderproduct
    {
        public decimal Price { get; set; }
        public int Orderid { get; set; }
        public int Productid { get; set; }

        public virtual Order Order { get; set; } = null!;
        public virtual Product Product { get; set; } = null!;
    }
}
