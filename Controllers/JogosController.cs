using Microsoft.AspNetCore.Mvc;
using SaveRoom.Services;
using System.Threading.Tasks;
using SaveRoom.Models.Filters;
using SaveRoom.Services.Interfaces;

namespace SaveRoom.Controllers
{
    public class JogosController : Controller
    {
        private readonly RawgApiService1 _rawgApi;

        public JogosController(RawgApiService1 rawgApi)
        {
            _rawgApi = rawgApi;
        }

        public async Task<IActionResult> Perfil(int id)
        {
            var jogo = await _rawgApi.ObterDetalhesDoJogo(id);
            
            if (jogo == null)
            {
                return NotFound();
            }

            // Busca os posts e anexa ao jogo
            jogo.PostsDaComunidade = await _rawgApi.ObterPostsDoReddit(id);

            return View(jogo);
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

            // 5. Se a API não retornar nada, devolve para a Home com uma mensagem de erro
            TempData["ErroBusca"] = $"Nenhum jogo encontrado com o nome '{nomeJogo}'.";
            return RedirectToAction("Index", "Home");
        }

    }
}