using System;
using System.Collections.Generic;

namespace Hardware_Store_App.Models
{
    public partial class Photo
    {
        public int Id { get; set; }
        public string Path { get; set; } = null!;
        public int? Productid { get; set; }

        public virtual Product? Product { get; set; }
    }
}
