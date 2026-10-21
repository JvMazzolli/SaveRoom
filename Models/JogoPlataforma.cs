using System.ComponentModel.DataAnnotations.Schema;

namespace SaveRoom.Models
{
    [Table("jogo_plataforma")]
    public class JogoPlataforma
    {
        [Column("id_jogo")]
        public int IdJogo { get; set; }
        [Column("id_plataforma")]
        public int IdPlataforma { get; set; }

        [ForeignKey(nameof(IdJogo))]
        public Jogo? Jogo { get; set; }

        [ForeignKey(nameof(IdPlataforma))]
        public Plataforma? Plataforma { get; set; }
    }
}
