using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Hardware_Store_App.Models
{
    public partial class Review
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MinLength(3)]
        public string Comment { get; set; } = null!;
        public DateTime Reviewdate { get; set; }
        [Required]
        [Range(1, 5)]
        public decimal Estimation { get; set; }
        [Required]
        public int? Userid { get; set; }
        [Required]
        public int? Productid { get; set; }


        public virtual Product? Product { get; set; }
        public virtual User? User { get; set; }
    }
}
