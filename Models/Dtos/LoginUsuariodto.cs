
using System.ComponentModel.DataAnnotations;

namespace SaveRoom.Models.Dtos
{
    public class LoginUsuarioDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Senha { get; set; } = string.Empty;
    }
}
