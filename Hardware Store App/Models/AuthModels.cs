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
        [MinLength(2)]
        [MaxLength(50)]
        [RegularExpression("^[a-zA-Z]([a-zA-Z]| |-|')*$",
            ErrorMessage = "The first name has to start with a letter and consist only of letters, space, - or '")]
        public string FirstName { get; set; } = String.Empty;
        [Required]
        [MinLength(2)]
        [MaxLength(50)]
        [RegularExpression("^[a-zA-Z]([a-zA-Z]| |-|')*$",
            ErrorMessage = "The last name has to start with a letter and consist only of letters, space, - or '")]
        public string LastName { get; set; } = String.Empty;
        [Required]
        [MaxLength(320)]
        [EmailAddress]
        public string Email { get; set; } = String.Empty;
        [Required]
        [MinLength(8)]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&_])[A-Za-z\\d@$!%*#?&_]{8,}$",
            ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character")]
        public string Password { get; set; } = String.Empty;
        [Required]
        [Compare("Password",
            ErrorMessage = "Passwords do not match")]
        public string PasswordConfirm { get; set; } = String.Empty;
        [MinLength(7)]
        [MaxLength(16)]
        [RegularExpression("^\\+\\d{6,15}$",
            ErrorMessage = "Phone number is incorrect")]
        public string? PhoneNumber { get; set; } = null;
        [Required]
        [RegularExpression("male|female",
            ErrorMessage = "Sex must be 'male' or 'female'")]
        public string Sex { get; set; } = String.Empty;
        [Required]
        public DateTime? Birthdate { get; set; } = null;
        [MinLength(7)]
        [MaxLength(200)]
        public string? Address { get; set; } = null;
        public int Roleid { get; set; } = 2;
    }

    public class EditModel
    {
        [Required]
        [MinLength(2)]
        [MaxLength(50)]
        [RegularExpression("^[a-zA-Z]([a-zA-Z]| |-|')*$",
            ErrorMessage = "The first name has to start with a letter and consist only of letters, space, - or '")]
        public string FirstName { get; set; } = String.Empty;
        [Required]
        [MinLength(2)]
        [MaxLength(50)]
        [RegularExpression("^[a-zA-Z]([a-zA-Z]| |-|')*$",
            ErrorMessage = "The last name has to start with a letter and consist only of letters, space, - or '")]
        public string LastName { get; set; } = String.Empty;
        [Required]
        [MaxLength(320)]
        [EmailAddress]
        public string Email { get; set; } = String.Empty;
        [MinLength(8)]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&_])[A-Za-z\\d@$!%*#?&_]{8,}$",
            ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character")]
        public string? Password { get; set; } = null;
        [Compare("Password",
            ErrorMessage = "Passwords do not match")]
        public string? PasswordConfirm { get; set; } = null;
        [MinLength(7)]
        [MaxLength(16)]
        [RegularExpression("^\\+\\d{6,15}$",
            ErrorMessage = "Phone number is incorrect")]
        public string? PhoneNumber { get; set; } = null;
        [Required]
        [RegularExpression("male|female",
            ErrorMessage = "Sex must be 'male' or 'female'")]
        public string Sex { get; set; } = String.Empty;
        [Required]
        public DateTime? Birthdate { get; set; } = null;
        [MinLength(7)]
        [MaxLength(200)]
        public string? Address { get; set; } = null;
    }
}
