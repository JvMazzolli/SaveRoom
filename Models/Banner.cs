using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SaveRoom.Models;

[Table("banner")]
public class Banner
{
    [Key]
    [Column("id_banner")]
    public int IdBanner { get; set; }

    [Column("nome")]
    public string Nome { get; set; } = string.Empty;

    [Column("image_url")]
    public string ImageUrl { get; set; } = string.Empty;
}