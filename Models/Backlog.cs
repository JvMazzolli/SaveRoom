using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SaveRoom.Models
{
    [Table("backlog")]
    public class Backlog
    {
        [Key]
        [Column("id_backlog")]
        public int IdBacklog { get; set; }

        [Column("id_perfil")]
        public int IdPerfil { get; set; }

        [Column("id_jogo")]
        public int IdJogo { get; set; }

        [MaxLength(20)]
        [Column("status")]
        public string Status { get; set; } = "a_jogar";
        [Column("data_adicao")]
        public DateTime DataAdicao { get; set; } = DateTime.UtcNow;

        [Column("data_conclusao")]
        public DateTime? DataConclusao { get; set; }

        [Column("nome_jogo")]
        public string NomeJogo { get; set; } = string.Empty;

        [Column("metacritic")]
        public int? Metacritic {get; set; }

        [Column("plataformas")]
        public string? Plataformas {get; set;}
        [Column]
        [ForeignKey(nameof(IdPerfil))]
        public Perfil? Perfil { get; set; }

        [ForeignKey(nameof(IdJogo))]
        public Jogo? Jogo { get; set; }

    }
}
