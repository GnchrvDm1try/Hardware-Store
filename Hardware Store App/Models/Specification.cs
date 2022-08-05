using System;
using System.Collections.Generic;

namespace Hardware_Store_App.Models
{
    public partial class Specification
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Value { get; set; } = null!;
        public int? Productid { get; set; }

        public virtual Product? Product { get; set; }
    }
}
