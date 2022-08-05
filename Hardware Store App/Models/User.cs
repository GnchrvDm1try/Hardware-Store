using System;
using System.Collections.Generic;

namespace Hardware_Store_App.Models
{
    public partial class User
    {
        public User()
        {
            Orders = new HashSet<Order>();
            Reviews = new HashSet<Review>();
            Products = new HashSet<Product>();
        }

        public int Id { get; set; }
        public string Firstname { get; set; } = null!;
        public string Lastname { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Phonenumber { get; set; }
        public string Sex { get; set; } = null!;
        public bool Isemailconfirmed { get; set; }
        public DateOnly Birthdate { get; set; }
        public DateTime Registrationdate { get; set; }
        public string Address { get; set; } = null!;
        public string? Hashedpassword { get; set; }
        public int? Roleid { get; set; }

        public virtual Role? Role { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
