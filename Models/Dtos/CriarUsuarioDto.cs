using System.ComponentModel.DataAnnotations;
namespace SaveRoom.Models.Dtos
{
    public class CriarUsuarioDto
    {
        [Required]
        [MaxLength(100)]
        public string Nome { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        public string Senha {  get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Nickname {  get; set; } = string.Empty;

        public string? AvatarUrl { get; set; }
        public string? Bio {  get; set; }
    }
}
