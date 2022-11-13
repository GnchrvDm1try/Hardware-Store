using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Hardware_Store_App.Models
{
    public partial class Order
    {
        public Order()
        {
            Orderproducts = new HashSet<Orderproduct>();
        }

        [Required]
        public int? Id { get; set; }
        public DateTime Orderdate { get; set; }
        public int? Userid { get; set; }
        public int Statusid { get; set; }
        public string Address { get; set; } = null!;

        public virtual Status? Status { get; set; }
        public virtual User? User { get; set; }
        public virtual ICollection<Orderproduct> Orderproducts { get; set; }
    }
}
