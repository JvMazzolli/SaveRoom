using SaveRoom.Services.Interfaces;
using System.Text.Json;
//rever os erros presentes na interface, ver a lis, fazer uma funcao para plataformas
using System.Web;
using SaveRoom.Models.Dtos;
using SaveRoom.Models.Filters;
using System.Text.Json.Serialization;
using SaveRoom.Models;
namespace SaveRoom.Services
{
    public class RawgApiService1 : IRawgApiService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiChave;

        public RawgApiService1(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient; 
            _httpClient.BaseAddress = new Uri("https://api.rawg.io/api/");
            _apiChave = configuration["RawgApi:ApiChave"]
                ?? throw new InvalidOperationException("A chave 'RawgApi:ApiChave' não fopi configurada corretamente.");
        }

        public async Task<RawgGameDetailsDto?> ObterDetalhesdosJogos(int id)
        {
            var response =
                await _httpClient.GetAsync(
                    $"games/{id}?key={_apiChave}");
            if (!response.IsSuccessStatusCode)
            {
                return null;
            }
            var json = 
                await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<RawgGameDetailsDto>(json);
        } 
        public async Task<RawgResponseDto<RawDtos<Platforms>>?>ObterJogosAsync(RawGameFilter filter)
        {
            var query = HttpUtility.ParseQueryString(string.Empty);
            query["key"] = _apiChave;
            query["page"] = filter.Page.ToString();
            query["page_size"] = filter.PageSize.ToString();

            if (!string.IsNullOrWhiteSpace(filter.Search)) query["search"] = filter.Search;
            if (filter.SearchPrecise.HasValue) query["search_precise"] = filter.SearchPrecise.Value.ToString().ToLower();
            if (filter.SearchExact.HasValue) query["search_exact"] = filter.SearchExact.Value.ToString().ToLower();
            if (!string.IsNullOrWhiteSpace(filter.Platforms)) query["platforms"] = filter.Platforms;
            if (!string.IsNullOrWhiteSpace(filter.Genres)) query["genres"] = filter.Genres;
            if (!string.IsNullOrWhiteSpace(filter.Ordering)) query["ordering"] = filter.Ordering;
            if (!string.IsNullOrWhiteSpace(filter.Dates)) query["dates"] = filter.Dates;

            var response = await _httpClient.GetAsync($"games?{query}");

            if (!response.IsSuccessStatusCode)
            {
                var erro = await response.Content.ReadAsStringAsync();
                throw new HttpRequestException($"Erro na RAWG ({response.StatusCode}): {erro}");
            }
            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<RawgResponseDto<RawDtos<Platforms>>>(json);
        }
        public async Task<List<RawgAchievementDto>> ObterConquistasDoJogoAsync(int idRawg)
{
    var url = $"games/{idRawg}/achievements?key={_apiChave}";
    
    var response = await _httpClient.GetAsync(url);
    if (!response.IsSuccessStatusCode)
    {
        return new List<RawgAchievementDto>();
    }

    var content = await response.Content.ReadAsStringAsync();
    var resultado = JsonSerializer.Deserialize<RawgAchievementResponseDto>(content, new JsonSerializerOptions
    {
        PropertyNameCaseInsensitive = true
    });

    // Correção do operador para retornar a lista de resultados com segurança
    return resultado?.Results ?? new List<RawgAchievementDto>();
}
    }
}
