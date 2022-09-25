using System;
using System.Collections.Generic;

namespace Hardware_Store_App.Models
{
    public partial class Order
    {
        public Order()
        {
            Orderproducts = new HashSet<Orderproduct>();
        }

        public int Id { get; set; }
        public DateTime Orderdate { get; set; }
        public int? Userid { get; set; }
        public int Statusid { get; set; }

        public virtual Status Status { get; set; } = null!;
        public virtual User? User { get; set; }
        public virtual ICollection<Orderproduct> Orderproducts { get; set; }
    }
}
