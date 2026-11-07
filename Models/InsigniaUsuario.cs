using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SaveRoom.Models
{
    [Table("insignia_usuario")]
    public class InsigniaUsuario
    {
        [Column("id_insignia")]
        public int IdInsignia { get; set; }

        [ForeignKey(nameof(IdInsignia))]
        public Insignia? Insignia { get; set; }

        [Column("id_perfil")]
        public int IdPerfil { get; set; }

        [ForeignKey(nameof(IdPerfil))]
        public Perfil? Perfil { get; set; }

        [Column("data_conquista")]
        public DateTime DataConquista { get; set; } = DateTime.UtcNow;
    }
}