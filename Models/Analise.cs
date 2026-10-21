using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SaveRoom.Models
{
    [Table("analise")]
    public class Analise
    {
        [Key]
        [Column("id_analise")]
        public int IdAnalise {  get; set; }

        [Column("id_jogo")]
        public int IdJogo { get; set; }

        [Column("id_perfil")]
        public int IdPerfil { get; set; }

        [Column("nota")]
        public decimal Nota { get; set; }

        [Column("comentario")]
        public string? Comentario { get; set;  }

        [Column("data")]
        public DateTime Data { get; set;  }


        [ForeignKey(nameof(IdJogo))]
        public Jogo? Jogo { get; set; }

        [ForeignKey(nameof(IdPerfil))]
        public Perfil? Perfil { get; set; }

    }
}
