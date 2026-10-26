using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SaveRoom.Models;

[Table("avatar")]
public class Avatar
{
    [Key]
    [Column("id_avatar")]
    public int IdAvatar { get; set; }

    [Column("nome")]
    public string Nome { get; set; } = string.Empty;

    [Column("imagem_url")]
    public string ImagemUrl { get; set; } = string.Empty;
}