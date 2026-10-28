using SaveRoom.Data;
using SaveRoom.Models;
using SaveRoom.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;


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
                Bio = dto.Bio,
                IdAvatar = 1,
                IdBanner = 1,
                IdTitulo = 1
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
                    .Include(p => p.Avatar)
                    .Include(p => p.Banner)
                    .Include(p => p.TituloPerfil)
                    .Include(p => p.Backlogs)
                        .ThenInclude(b => b.Jogo)
                    .FirstOrDefaultAsync(p => p.IdPerfil == id );
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
                nickname = perfil.Nickname,
                bio = perfil.Bio,
                avatar = perfil.Avatar == null
                ? null
                : new
                {
                    idAvatar = perfil.Avatar.IdAvatar,
                    nome = perfil.Avatar.Nome,
                    imagemUrl = perfil.Avatar.ImagemUrl
                },
                banner = perfil.Banner == null
                ? null
                : new
                {
                    idBanner = perfil.Banner.IdBanner,
                    nome = perfil.Banner.Nome,
                    imageUrl = perfil.Banner.ImageUrl
                },
                titulo = perfil.TituloPerfil == null
                ? null
                : new
                {
                    idTitulo = perfil.TituloPerfil.IdTitulo,
                    nome = perfil.TituloPerfil.Nome
                },
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
        

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUsuarioDto dto)
        {
            var email = dto.Email.Trim().ToLower();

            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email.ToLower() == email);

            if (usuario == null)
            {
                return Unauthorized(new
                {
                    mensagem = "E-mail ou senha inválidos"
                });
            }

            var senhaHash = Convert.ToBase64String(
                System.Text.Encoding.UTF8.GetBytes(dto.Senha + usuario.Salt)
            );

            if (usuario.SenhaHash != senhaHash)
            {
                return Unauthorized(new
                {
                    mensagem = "E-mail ou senha inválidos"
                });
            }

            var perfil = await _context.Perfis
                .FirstOrDefaultAsync(p => p.IdUsuario == usuario.IdUsuario);

            if (perfil == null)
            {
                return Unauthorized(new
                {
                    mensagem = "Perfil do usuário não encontrado"
                });
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.IdUsuario.ToString()),
                new Claim(ClaimTypes.Name, perfil.Nickname),
                new Claim(ClaimTypes.Email, usuario.Email)
            };

            var identidade = new ClaimsIdentity(
                claims,
                CookieAuthenticationDefaults.AuthenticationScheme
            );

            var principal = new ClaimsPrincipal(identidade);

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                principal
            );

            return Ok(new
            {
                mensagem = "Login realizado com sucesso",
                idUsuario = usuario.IdUsuario,
                idPerfil = perfil.IdPerfil,
                nome = usuario.Nome,
                email = usuario.Email,
                nickname = perfil.Nickname
            });
        }
    }
}
