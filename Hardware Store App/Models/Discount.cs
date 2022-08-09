using System;
using System.Collections.Generic;

namespace Hardware_Store_App.Models
{
    public partial class Discount
    {
        public int Id { get; set; }
        public decimal Percentage { get; set; }
        public DateTime Begindate { get; set; }
        public DateTime Enddate { get; set; }
        public int? Productid { get; set; }

        public virtual Product? Product { get; set; }
    }
}
