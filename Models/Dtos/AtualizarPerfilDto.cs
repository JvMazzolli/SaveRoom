namespace SaveRoom.Models.Dtos;
//JOAO VICTOR
public class AtualizarPerfilDto
{
    public int IdAvatar { get; set; }

    public int IdBanner { get; set; }

    public int IdTitulo { get; set; }

    public string Nickname { get; set; }

    public string? Bio { get; set; }
}