using System;
using System.Collections.Generic;
using Hardware_Store_App.Services;

namespace Hardware_Store_App.Models
{
    public partial class User
    {
        public User()
        {
            Orders = new HashSet<Order>();
            Reviews = new HashSet<Review>();
            Wishlists = new HashSet<Wishlist>();
        }

        public User(RegisterModel model)
        {
            this.Firstname = model.FirstName;
            this.Lastname = model.LastName;
            this.Email = model.Email;
            this.Phonenumber = model.PhoneNumber;
            this.Sex = model.Sex;
            if (model.Birthdate != null)
                this.Birthdate = DateOnly.FromDateTime((DateTime)model.Birthdate);
            this.Hashedpassword = PasswordHasher.HashPassword(model.Password);
            this.Address = model.Address;
            this.Roleid = 2;
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
        public string? Address { get; set; }
        public string? Hashedpassword { get; set; }
        public int? Roleid { get; set; }

        public virtual Role? Role { get; set; }
        public virtual ICollection<Order>? Orders { get; set; }
        public virtual ICollection<Review>? Reviews { get; set; }
        public virtual ICollection<Wishlist>? Wishlists { get; set; }
    }
}
