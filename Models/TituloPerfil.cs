using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SaveRoom.Models;

[Table("titulo_perfil")]
public class TituloPerfil
{
    [Key]
    [Column("id_titulo")]
    public int IdTitulo { get; set; }

    [Column("nome")]
    public string Nome { get; set; } = string.Empty;

    [Column("descricao")]
    public string Descricao { get; set; } = string.Empty;
}