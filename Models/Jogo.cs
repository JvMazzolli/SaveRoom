using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace SaveRoom.Models
{
    [Table("jogo")]
    public class Jogo
    {
        [Key]
        [Column("id_jogo")]
        public int IdJogo { get; set; }

        [Required]
        [MaxLength(200)]
        [Column("nome")]
        public string Nome { get; set; } = string.Empty;

        [Column("descricao")]
        public string? Descricao { get; set; }

        [Column("data_lancamento")]
        public DateTime? DataLancamento { get; set; }

        [Column("id_rawg")]
        public int? IdRawg { get; set; }

        [Column("imagem_capa")]
        public string? ImagemCapa { get; set; }

        [MaxLength(150)]
        [Column("desenvolvedora")]
        public string? DEsenvolvedora { get; set; }

        [MaxLength(150)]
        [Column("publicadora")]
        public string? Publicadora { get; set; }
    
        [Column("rating")]
        public double? Rating {get; set;}

        [MaxLength]
        [Column("metacritic")]
        public int? Metacritic {get; set;}

        [MaxLength]
        [Column("plataformas")]
        public string? Plataformas {get; set;}
        
        public ICollection<JogoPlataforma> JogosPlataformas { get; set; } = new List<JogoPlataforma>();
        public ICollection<JogoGenero> JogosGeneros { get; set; } = new List<JogoGenero>();
        public ICollection<Backlog> Backlogs { get; set; } = new List<Backlog>();
        public ICollection<Analise> Analises { get; set; } = new List<Analise>();
    }
}
