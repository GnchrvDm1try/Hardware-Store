using System.ComponentModel.DataAnnotations;

namespace Hardware_Store_App.Models
{
    public class LoginModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = String.Empty;
        [Required]
        [MinLength(8)]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&_])[A-Za-z\\d@$!%*#?&_]{8,}$",
            ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character")]
        [DataType(DataType.Password)]
        public string Password { get; set; } = String.Empty;
    }

    public class RegisterModel
    {
        [Required]
        public string FirstName { get; set; } = String.Empty;
        [Required]
        public string LastName { get; set; } = String.Empty;
        [Required]
        [MinLength(8)]
        [MaxLength(200)]
        public string Password { get; set; } = String.Empty;
        [Required]
        [Compare("Password")]
        public string PasswordConfirm { get; set; } = String.Empty;
        [Required]
        [MinLength(3)]
        [MaxLength(320)]
        public string Email { get; set; } = String.Empty;
        [MinLength(7)]
        [MaxLength(16)]
        public string? PhoneNumber { get; set; } = null;
        [Required]
        public string Sex { get; set; } = String.Empty;
        [Required]
        public DateTime? Birthdate { get; set; } = null;
        [MinLength(7)]
        public string? Address { get; set; } = null;
        public int Roleid { get; set; } = 2;
    }
}
