using Microsoft.AspNetCore.Mvc;
using SaveRoom.Data;
using SaveRoom.Models;
using SaveRoom.Models.Dtos;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class PerfilController : ControllerBase
{
    private readonly AppDbContext _context;
    public PerfilController(
        AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("avatars")]
    public async Task<IActionResult>
        BuscarAvatares()
    {
        return Ok(
            await _context.Avatar
            .ToListAsync());
    }

    [HttpGet("banners")]
    public async Task<IActionResult>
        BuscarBanners()
    {
        return Ok(
            await _context.Banner
            .ToListAsync());
    }

    [HttpGet("titulos")]
    public async Task<IActionResult>
        BuscarTitulos()
    {
        return Ok(
            await _context.TituloPerfil
            .ToListAsync());
    }

    [HttpPut("{idPerfil}")]
    public async Task<IActionResult>
        AtualizarPerfil(
            int idPerfil,
            AtualizarPerfilDto dto)
    {
        var perfil =
            await _context.Perfis
            .FirstOrDefaultAsync(
                p => p.IdPerfil == idPerfil);

        if (perfil == null)
            return NotFound();

        perfil.IdAvatar =
            dto.IdAvatar;

        perfil.IdBanner =
            dto.IdBanner;

        perfil.IdTitulo =
            dto.IdTitulo;

        perfil.Bio =
            dto.Bio;

        await _context.SaveChangesAsync();

        return Ok(
            new
            {
                mensagem =
                    "Perfil atualizado"
            });
    }
}