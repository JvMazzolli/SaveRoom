using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SaveRoom.Models
{
    [Table("insignia")]
    public class Insignia
    {
        [Key]
        [Column("id_insignia")]
        public int IdInsignia { get; set; }

        [Required]
        [MaxLength(150)]
        [Column("nome")]
        public string Nome { get; set; } = string.Empty;

        [Column("descricao")]
        public string? Descricao { get; set; }

        [Required]
        [Column("icone_url")]
        public string IconeUrl { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        [Column("criterio_tipo")]
        public string CriterioTipo { get; set; } = string.Empty;

        [Column("criterio_valor")]
        public int CriterioValor { get; set; }

        public ICollection<InsigniaUsuario> InsigniasUsuarios { get; set; } = new List<InsigniaUsuario>();
    }
}