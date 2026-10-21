using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SaveRoom.Models
{
    [Table("genero")]
    public class Genero
    {
        [Key]
        [Column("id_genero")]
        public int IdGenero { get; set; }

        [Required]
        [MaxLength(100)]
        [Column("nome")]
        public string Nome { get; set; } = string.Empty;

        [Column("id_rawg")]
        public int? IdRawg { get; set; }
        public ICollection<JogoGenero> JogosGeneros { get; set; } = new List<JogoGenero>();
    }
}
