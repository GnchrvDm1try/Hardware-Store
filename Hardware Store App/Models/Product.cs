using System;
using System.Collections.Generic;

namespace Hardware_Store_App.Models
{
    public partial class Product
    {
        public Product()
        {
            Orderproducts = new HashSet<Orderproduct>();
            Photos = new HashSet<Photo>();
            Reviews = new HashSet<Review>();
            Specifications = new HashSet<Specification>();
            Storages = new HashSet<Storage>();
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public decimal Rating { get; set; }
        public int? Categoryid { get; set; }
        public int? Manufacturerid { get; set; }
        public int? Countryproducerid { get; set; }

        public virtual Category? Category { get; set; }
        public virtual Countryproduser? Countryproducer { get; set; }
        public virtual Manufacturer? Manufacturer { get; set; }
        public virtual ICollection<Orderproduct> Orderproducts { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<Specification> Specifications { get; set; }
        public virtual ICollection<Storage> Storages { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
