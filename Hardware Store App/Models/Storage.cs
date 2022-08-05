using System;
using System.Collections.Generic;

namespace Hardware_Store_App.Models
{
    public partial class Storage
    {
        public int Id { get; set; }
        public int Amount { get; set; }
        public int? Productid { get; set; }

        public virtual Product? Product { get; set; }
    }
}
