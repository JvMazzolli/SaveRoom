using SaveRoom.Data;
using SaveRoom.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaveRoom.Models;
using SaveRoom.Services;
using SaveRoom.Services.Interfaces;
using SaveRoom.Models.Filters;
using System.Globalization;

namespace SaveRoom.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BacklogController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IRawgApiService _rawApiService;
        public BacklogController(AppDbContext context, IRawgApiService rawApiService)
        {
            _context = context;
            _rawApiService = rawApiService;
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
            var detalhes = 
                await Irawg.ObterDetalhesdosJogos(
                    dadosRawg.Id
                );
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
                    Descricao = detalhes?.Description,
                    ImagemCapa = dadosRawg.BackgroundImage,
                    DataLancamento = dataLancamento,
                    DEsenvolvedora = detalhes?.Developers.FirstOrDefault()?.Name?? "Não Informado",
                    Publicadora = detalhes?.Publishers.FirstOrDefault()?.Name?? "Não Informado",
                    Rating = detalhes?.Rating,
                    Metacritic = detalhes?.Metacritic,
                    Plataformas = 
                    string.Join(", ",
                    detalhes?.Platforms
                    .Select(p => p.Platform.Name)
                    ?? Enumerable.Empty<string>())
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
                            Metacritic = detalhes?.Metacritic,
                            Plataformas = 
                            string.Join(", ",
                            detalhes?.Platforms
                            .Select(p => p.Platform.Name)
                            ?? Enumerable.Empty<string>()),
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
        //end para conquistas
        [HttpGet("jogo/{idJogo}/conquistas-detalhadas/{idPerfil}")]
        public async Task<IActionResult> GetConquistasDetalhadas(int idJogo, int idPerfil)
        {
            var jogo = await _context.Jogos.FirstOrDefaultAsync(j => j.IdJogo == idJogo || j.IdRawg == idJogo);
            if (jogo == null || jogo.IdRawg == null)
            return NotFound(new { mensagem = "Jogo não encontrado ou sem ID RAWG." });
            var conquistasRawg = await _rawApiService.ObterConquistasDoJogoAsync(jogo.IdRawg.Value);
            int totalConquistas = conquistasRawg.Count;
            // Se quiser simular um número aleatório de alcançadas baseado no ID do perfil e do jogo (para não mudar toda vez que fechar e abrir)
            Random rnd = new Random(idPerfil + jogo.IdJogo);
            int totalAlcancadas = totalConquistas > 0 ? rnd.Next(0, totalConquistas + 1) : 0;
            double porcentagemGeral = totalConquistas > 0 ? Math.Round(((double)totalAlcancadas / totalConquistas) * 100, 1) : 0;
            var resultado = conquistasRawg.Select((c, index) => {
                double.TryParse(c.Percent, NumberStyles.Any, CultureInfo.InvariantCulture, out double percentGlobal);
                // Marca as primeiras 'totalAlcancadas' como conquistadas para simular o progresso
                bool foiConquistado = index < totalAlcancadas;
                return new {
                    id = c.Id,
                    nome = c.Name,
                    descricao = c.Description,
                    iconeUrl = c.Image,
                    percentualGlobal = Math.Round(percentGlobal, 1),
                    conquistado = foiConquistado, 
                    dataObtida = foiConquistado ? "24/10/2026" : ""
                };
            }).ToList();

            return Ok(new {
                nomeJogo = jogo.Nome,
                capaUrl = jogo.ImagemCapa,
                totalAlcancadas = totalAlcancadas,
                totalConquistas = totalConquistas,
                porcentagemGeral = porcentagemGeral,
                conquistas = resultado
            });
        }
    }
}