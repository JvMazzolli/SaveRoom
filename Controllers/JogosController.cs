using Microsoft.AspNetCore.Mvc;
using SaveRoom.Services;
using System.Threading.Tasks;

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

            // NOVO: Busca os posts e anexa ao jogo
            jogo.PostsDaComunidade = await _rawgApi.ObterPostsDoReddit(id);

            return View(jogo);
        }
    }
}