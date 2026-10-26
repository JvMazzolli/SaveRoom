using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SaveRoom.Models
{
    [Table("perfil")]
    public class Perfil
    {
        [Key]
        [Column("id_perfil")]
        public int IdPerfil { get; set; }

        [Column("id_usuario")]
        public int IdUsuario { get; set; }

        [Column("id_avatar")]
        public int IdAvatar {get; set;}

        [Column("id_banner")]
        public int IdBanner {get;set;}

        [Column("id_titulo")]
        public int IdTitulo {get;set;}

        [Required]
        [MaxLength(100)]
        [Column("nickname")]
        public string Nickname { get; set; } = string.Empty;

        [Column("bio")]
        public string? Bio { get; set; }

        [ForeignKey(nameof(IdUsuario))]
        public Usuario? Usuario { get; set; }

        [ForeignKey(nameof(IdAvatar))]
        public Avatar? Avatar { get; set; }
        
        [ForeignKey(nameof(IdBanner))]
        public Banner? Banner { get; set; }
        [ForeignKey(nameof(IdTitulo))]
        public TituloPerfil? TituloPerfil { get; set; }

        public ICollection<Backlog> Backlogs { get; set; } = new List<Backlog>();
        public ICollection<Analise> Analises { get; set; } = new List<Analise>();
       
             
    }
}
