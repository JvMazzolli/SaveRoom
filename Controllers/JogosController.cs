using Microsoft.AspNetCore.Mvc;
using SaveRoom.Services;
using System.Threading.Tasks;
using SaveRoom.Models.Filters;
using SaveRoom.Services.Interfaces;

//MODO sem API
using SaveRoom.Data;                  
using Microsoft.EntityFrameworkCore;  
using SaveRoom.Models;

namespace SaveRoom.Controllers
{
    public class JogosController : Controller
    {
        private readonly RawgApiService1 _rawgApi;

        //MODO sem API
        private readonly AppDbContext _context;

        public JogosController(RawgApiService1 rawgApi, AppDbContext context)
        {
            _rawgApi = rawgApi;

            //MODO sem API
            _context = context;
        }

        public async Task<IActionResult> Perfil(int id)
        {
            
            /* ==========================================
             * CÓDIGO DA API RAWG (COMENTADO / MODO OFFLINE)
             * ==========================================
            
            var jogo = await _rawgApi.ObterDetalhesDoJogo(id);
            
            if (jogo == null)
            {
                return NotFound();
            }

            // Busca os posts e anexa ao jogo
            jogo.PostsDaComunidade = await _rawgApi.ObterPostsDoReddit(id);

            return View(jogo);
            */
            
            // ==========================================
            // NOVO CÓDIGO: BUSCANDO DO BANCO DE DADOS LOCAL
            // ==========================================
            var jogoDoBanco = await _context.Jogos
                .FirstOrDefaultAsync(j => j.IdRawg == id || j.IdJogo == id);

            if (jogoDoBanco == null)
            {
                return NotFound("Jogo não encontrado no banco de dados.");
            }

            var model = new JogoPerfil
            {
                Id = jogoDoBanco.IdRawg ?? jogoDoBanco.IdJogo,
                Name = jogoDoBanco.Nome,
                Description_Raw = jogoDoBanco.Descricao,
                Released = jogoDoBanco.DataLancamento?.ToString("yyyy-MM-dd"),
                Background_Image = jogoDoBanco.ImagemCapa,
                Background_Image_Additional = jogoDoBanco.ImagemAdicional, 
                Rating = jogoDoBanco.Rating ?? 0
            };

            // Passa as plataformas como string para a View
            ViewBag.PlataformasString = jogoDoBanco.Plataformas;

            return View(model);


        }

        // Busca de Jogos
        [HttpGet]
        public async Task<IActionResult> Buscar(string nomeJogo)
        {
            // 1. Verifica se o usuário digitou algo vazio
            if (string.IsNullOrWhiteSpace(nomeJogo))
            {
                return RedirectToAction("Index", "Home");
            }

            /* ==========================================
             * CÓDIGO DA API RAWG (COMENTADO / MODO OFFLINE)
             * ==========================================

            // 2. Cria o filtro para buscar apenas 1 resultado (o mais relevante) na RAWG
            var filtro = new RawGameFilter { Search = nomeJogo, Page = 1, PageSize = 1 };
    
            // 3. Chama a API da RAWG (certifique-se de que _rawApiService está injetado no construtor deste controller)
            var resposta = await _rawgApi.ObterJogosAsync(filtro);
            var jogoEncontrado = resposta?.Results.FirstOrDefault();

            // 4. Se encontrou o jogo, redireciona para a Action "Perfil" passando o ID real do jogo
            if (jogoEncontrado != null)
            {
                return RedirectToAction("Perfil", new { id = jogoEncontrado.Id });
            }
            */
            
            // ==========================================
            // NOVO CÓDIGO: BUSCANDO DO BANCO DE DADOS LOCAL
            // ==========================================

            var jogoEncontrado = await _context.Jogos
                .FirstOrDefaultAsync(j => j.Nome.ToLower().Contains(nomeJogo.ToLower()));

            if (jogoEncontrado != null)
            {
                // Redireciona usando o IdRawg se existir, senão usa o Id local
                return RedirectToAction("Perfil", new { id = jogoEncontrado.IdRawg ?? jogoEncontrado.IdJogo });
            }


            // 5. Se a API não retornar nada, devolve para a Home com uma mensagem de erro
            TempData["ErroBusca"] = $"Nenhum jogo encontrado com o nome '{nomeJogo}'.";
            return RedirectToAction("Index", "Home");
        }

        // ==========================================
        // MÉTODOS LOCAIS DE BACKLOG (ADICIONAR / REMOVER)
        // ==========================================

        [HttpPost]
        public async Task<IActionResult> AdicionarAoBacklog([FromBody] BacklogDto dto)
        {
            try
            {
                // 1. Busca o jogo no banco pelo nome para pegar o ID correto (evita erro de chave estrangeira)
                var jogoLocal = await _context.Jogos
                    .FirstOrDefaultAsync(j => j.Nome.ToLower() == dto.NomeJogo.ToLower());

                if (jogoLocal == null)
                {
                    return BadRequest(new { mensagem = "Jogo não encontrado no banco local para associar ao backlog." });
                }

                // 2. Verifica se já existe na coleção deste usuário
                var existente = await _context.Backlogs
                    .FirstOrDefaultAsync(b => b.IdPerfil == dto.IdPerfil && b.IdJogo == jogoLocal.IdJogo);

                if (existente != null)
                {
                    return BadRequest(new { mensagem = "Este jogo já está na sua coleção." });
                }

                // 3. Cria o backlog amarrando o IdJogo correto do banco
                var novoBacklog = new Backlog
                {
                    IdPerfil = dto.IdPerfil,
                    IdJogo = jogoLocal.IdJogo, // <--- Aqui está o ID correto que o banco exige!
                    NomeJogo = jogoLocal.Nome,
                    Metacritic = jogoLocal.Metacritic,
                    Plataformas = jogoLocal.Plataformas,
                    Status = string.IsNullOrEmpty(dto.Status) ? "a_jogar" : dto.Status,
                    DataAdicao = DateTime.UtcNow
                };

                _context.Backlogs.Add(novoBacklog);
                await _context.SaveChangesAsync();

                return Ok(new { mensagem = "Jogo adicionado com sucesso!" });
            }
            catch (Exception ex)
            {
                string mensagemErro = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return StatusCode(500, new { mensagem = "Erro ao adicionar o jogo: " + mensagemErro });
            }
        }

        [HttpPost]
        public async Task<IActionResult> RemoverDoBacklog([FromBody] BacklogDto dto)
        {
            try
            {
                var backlogItem = await _context.Backlogs
                    .FirstOrDefaultAsync(b => b.IdPerfil == dto.IdPerfil && b.NomeJogo == dto.NomeJogo);

                if (backlogItem == null)
                {
                    return NotFound(new { mensagem = "Jogo não encontrado na sua coleção." });
                }

                _context.Backlogs.Remove(backlogItem);
                await _context.SaveChangesAsync();

                return Ok(new { mensagem = "Jogo removido da coleção com sucesso!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Erro ao remover o jogo: " + ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> VerificarNaColecao(int idPerfil, string nomeJogo)
        {
            var existe = await _context.Backlogs
                .AnyAsync(b => b.IdPerfil == idPerfil && b.NomeJogo == nomeJogo);

            return Json(new { naColecao = existe });
        }
    }

    public class BacklogDto
    {
        public int IdPerfil { get; set; }
        public string NomeJogo { get; set; }
        public string Status { get; set; }
    }
}

    
