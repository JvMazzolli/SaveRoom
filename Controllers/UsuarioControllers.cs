using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SaveRoom.Controllers
{
    [Authorize] // logado com o cookie
    public class UsuarioController : Controller
    {
        [HttpGet]
        public IActionResult Perfil()
        {
            // Pega o IdPerfil (pois inha parte da api funciona pela IdPerfil) guardado no Cookie de autenticação durante o login
            var idPerfil = User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Passa para a View se precisar (Se rolar qualquer problema relacionado ao Id ele vai puxar os dois)
            ViewBag.UsuarioId = idPerfil;
            // Retorna o arquivo Views/Usuario/Perfil.cshtml
            return View();
        }

        [HttpGet]
        public IActionResult Gerenciar()
        {
            var idPerfil = User.FindFirstValue(ClaimTypes.NameIdentifier);
            ViewBag.UsuarioId = idPerfil;
            return View();
        }
    }
}