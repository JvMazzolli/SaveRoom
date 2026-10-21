using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic; // Adicione esta linha no topo
using Saveroom.Models;

namespace Saveroom.Services
{
    public class RawgApiService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey = "7b84045ceb7445ae80bcf0e59933e103"; 

        public RawgApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<JogoPerfil> ObterDetalhesDoJogo(int jogoId)
        {
            var url = $"https://api.rawg.io/api/games/{jogoId}?key={_apiKey}";
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var jsonString = await response.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            return JsonSerializer.Deserialize<JogoPerfil>(jsonString, options);
        }

        // Busca os posts do Reddit
        public async Task<List<RedditPost>> ObterPostsDoReddit(int jogoId)
        {
            var url = $"https://api.rawg.io/api/games/{jogoId}/reddit?key={_apiKey}";
            var response = await _httpClient.GetAsync(url);
            
            if (!response.IsSuccessStatusCode)
            {
                return new List<RedditPost>(); // Retorna lista vazia se der erro
            }

            var jsonString = await response.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var apiResponse = JsonSerializer.Deserialize<RedditApiResponse>(jsonString, options);
            
            return apiResponse?.Results ?? new List<RedditPost>();
        }
        
    }
    
}