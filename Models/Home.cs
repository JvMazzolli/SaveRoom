using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BACKLOG_API.Models
{
    public class Home
    {
        [Key]
        [Column("id_jogo")]
        public int Id { get; set; }
        [Required]
        [Column("nome")]
        [MaxLength(200)]
        public string? Nome { get; set; }
        [Column("descricao")]
        public string? Descricao;
        [Column("data_lancamento")]
        public DateTime DataLancamento {  get; set; }
        [Column("id_rawg")]
        public int IdRawg {  get; set; }
        [Column("imagem_capa")]
        public string? ImagemCapa { get; set; }
        [Column("desenvolvedora")]
        [MaxLength(150)]
        public string? Desenvolvedora {  get; set; }
        [Column("publicadora")]
        [MaxLength(150)]
        public string? Publicadora { get; set; }
    }
}
