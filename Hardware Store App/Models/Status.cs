using System;
using System.Collections.Generic;

namespace Hardware_Store_App.Models
{
    public partial class Status
    {
        public Status()
        {
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public string Title { get; set; } = null!;

        public virtual ICollection<Order> Orders { get; set; }
    }
}
