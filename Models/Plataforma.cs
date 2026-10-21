using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SaveRoom.Models
{
    [Table("plataforma")]
    public class Plataforma
    {
        [Key]
        [Column("id_plataforma")]
        public int IdPlataforma { get; set; }

        [Required]
        [MaxLength(100)]
        [Column("nome")]
        public string Nome { get; set; } = string.Empty;

        [MaxLength(100)]
        [Column("fabricante")]
        public string? Fabricante { get; set; }

        [Column("id_rawg")]
        public int? IdRawg { get; set; }

        public ICollection<JogoPlataforma> JogosPlataformas { get; set; } = new List<JogoPlataforma>();

    }
}
