using SaveRoom.Models.Filters;
using SaveRoom.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace SaveRoom.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JogosController1 : ControllerBase
    {
        private readonly IRawgApiService _rawApiService;
        public JogosController1(IRawgApiService rawApiService)
        {
            _rawApiService = rawApiService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] RawGameFilter filter)
        {
            try
            {
                var resultado = await _rawApiService.ObterJogosAsync(filter);
                return Ok(resultado);
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(500, new {mensagem = "Erro ao se comunicar com a API RAWG", detalhe = ex.Message});
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Erro interno no servidor", detallhe  = ex.Message});
            }
        }
    }
}
