using System;
using System.Collections.Generic;

namespace Hardware_Store_App.Models
{
    public partial class Countryproducer
    {
        public Countryproducer()
        {
            Products = new HashSet<Product>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<Product> Products { get; set; }
    }
}
