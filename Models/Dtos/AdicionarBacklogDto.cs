using System.ComponentModel.DataAnnotations;
namespace SaveRoom.Models.Dtos
{
    public class AdicionarBacklogDto
    {
        [Required]
        public int IdPerfil { get; set; }

        [Required]
        public string NomeJogo { get; set; } = string.Empty;

        [Required]
        public string Status { get; set; } = "a_jogar";

        
    }
}
