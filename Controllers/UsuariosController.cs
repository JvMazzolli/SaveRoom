using SaveRoom.Data;
using SaveRoom.Models;
using SaveRoom.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace SaveRoom.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost("registrar")]
        public async Task<IActionResult> Registrar([FromBody] CriarUsuarioDto dto)
        {
            var emailExite = await _context.Usuarios.AnyAsync(u => u.Email.ToLower() == dto.Email.ToLower());
            if (emailExite)
            {
                return BadRequest(new { mensagem = "Este email ja esta em uso" });
            }
            string salt = Guid.NewGuid().ToString("n");
            string senhaHash = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(dto.Senha + salt));
            var usuario = new Usuario
            {
                Nome = dto.Nome,
                Email = dto.Email,
                SenhaHash = senhaHash,
                Salt = salt,
                DataCriacao = DateTime.UtcNow
            };
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            var perfil = new Perfil
            {
                IdUsuario = usuario.IdUsuario,
                Nickname = dto.Nickname,
                AvatarUrl = dto.AvatarUrl,
                Bio = dto.Bio
            };
            _context.Perfis.Add(perfil);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(ObterPerfilPorId), new { id = perfil.IdPerfil }, new
            {
                mensagem = "Usuario e perfil criados com sucesso",
                idUsuario = usuario.IdUsuario,
                idPerfil = perfil.IdPerfil,
                nickname = perfil.Nickname,
                email = usuario.Email
            });

        }
        [HttpGet("perfil/{id}")]
        public async Task<IActionResult> ObterPerfilPorId(int id)
        {
            var perfil = await _context.Perfis
                .Include(p => p.Usuario)
                .Include(p => p.Backlogs)
                    .ThenInclude(b => b.Jogo)
                .FirstOrDefaultAsync(p => p.IdPerfil == id);

            if (perfil == null)
            {
                return NotFound(new
                {
                    mensagem = "Perfil não encontrado"
                });
            }

            return Ok(new
            {
                idPerfil = perfil.IdPerfil,
                idUsuario = perfil.IdUsuario,
                nome = perfil.Usuario?.Nome,
                nickname = perfil.Nickname,
                email = perfil.Usuario?.Email,
                avatarUrl = perfil.AvatarUrl,
                bio = perfil.Bio,

                backlog = perfil.Backlogs
                    .OrderByDescending(b => b.DataAdicao)
                    .Select(b => new
                    {
                        idBacklog = b.IdBacklog,
                        idJogo = b.IdJogo,
                        nomeJogo = b.NomeJogo,
                        status = b.Status,
                        dataAdicao = b.DataAdicao,
                        dataConclusao = b.DataConclusao,

                        imagem = b.Jogo != null
                            ? b.Jogo.ImagemCapa
                            : null,

                        descricao = b.Jogo != null
                            ? b.Jogo.Descricao
                            : null
                    })
            });
        }
    }
}
