using System.ComponentModel.DataAnnotations.Schema;

namespace SaveRoom.Models
{
    [Table("jogo_genero")]
    public class JogoGenero
    {
        [Column("id_jogo")]
        public int IdJogo { get; set; }

        [Column("id_genero")]
        public int IdGenero { get; set; }

        [ForeignKey(nameof(IdJogo))]
        public Jogo? Jogo { get; set; }

        [ForeignKey(nameof(IdGenero))]
        public Genero? Genero { get; set; }
    }
}
