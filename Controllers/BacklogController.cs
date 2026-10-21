using SaveRoom.Data;
using SaveRoom.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaveRoom.Models;
using SaveRoom.Services;
using SaveRoom.Services.Interfaces;
using SaveRoom.Models.Filters;

namespace SaveRoom.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BacklogController : ControllerBase
    {
        private readonly AppDbContext _context;
        public BacklogController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost("adicionar")]
        public async Task<IActionResult> AdicionarAoBacklog([FromBody] AdicionarBacklogDto dto, [FromServices] IRawgApiService Irawg)
        {
            var perfilExiste = await _context.Perfis.AnyAsync(p => p.IdPerfil == dto.IdPerfil);
            if (!perfilExiste)
            {
                return NotFound(new { mensagem = "Perfil não encontrado." });
            }
            var filtro = new RawGameFilter { Search = dto.NomeJogo, Page = 1, PageSize = 1 };
            var resposta = await Irawg.ObterJogosAsync(filtro);
            var dadosRawg = resposta?.Results.FirstOrDefault();
            if(dadosRawg == null)
            {
                return NotFound(new {mensagem = "Jogo nao encontrado"});
            }
            var jogo = await _context.Jogos.FirstOrDefaultAsync(j => j.IdRawg == dadosRawg.Id);
if (jogo == null)
{
    DateTime? dataLancamento = null;
    if (DateTime.TryParse(dadosRawg.Released, out var parsedDate))
        dataLancamento = DateTime.SpecifyKind(parsedDate, DateTimeKind.Utc);

    jogo = new Jogo
    {
        IdRawg = dadosRawg.Id,
        Nome = dadosRawg.Name,
        Descricao = $"Jogo encontrado na RAWG: {dadosRawg.Name}",
        ImagemCapa = dadosRawg.BackgroundImage,
        DataLancamento = dataLancamento,
        DEsenvolvedora = "Desenvolvedora não informada pela RAWG",
        Publicadora = "Publicadora não informada"
    };

    _context.Jogos.Add(jogo);
    await _context.SaveChangesAsync();
}

            var itemBacklog = await _context.Backlogs
                .FirstOrDefaultAsync(b => b.IdPerfil == dto.IdPerfil && b.IdJogo == jogo.IdJogo);
            if(itemBacklog != null)
            {
                itemBacklog.Status = dto.Status.ToLower();
                if (dto.Status.ToLower() == "concluido" || dto.Status.ToLower() == "platinado" || dto.Status.ToLower() == "finalizado")
                {
                    itemBacklog.DataConclusao = DateTime.UtcNow;
                }
            }
            else
            {
                itemBacklog = new Backlog
                {
                    IdPerfil = dto.IdPerfil,
                    IdJogo = jogo.IdJogo,
                    NomeJogo = jogo.Nome,
                    Status = dto.Status.ToLower(),
                    DataAdicao = DateTime.UtcNow,
                    DataConclusao = (dto.Status.ToLower() == "concluido" || dto.Status.ToLower() == "platinado")
                    ? DateTime.UtcNow : null
                };
                _context.Backlogs.Add(itemBacklog);
            }
            await _context.SaveChangesAsync();
            return Ok(new
            {
                mensagem = "jogo adicionado com sucecsso ao backlog",
                idBacklog = itemBacklog.IdBacklog,
                status = itemBacklog.Status
            });

        }
    }
}
