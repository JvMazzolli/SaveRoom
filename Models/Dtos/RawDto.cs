using System.Text.Json.Serialization;
namespace SaveRoom.Models.Dtos
{
    public class RawgResponseDto<T>
    {
        [JsonPropertyName ("count")]
        public int Count { get; set; }
        [JsonPropertyName("next")]
        public string? Next { get; set; }
        [JsonPropertyName ("previous")]
        public string? Previous { get; set; }
        [JsonPropertyName("results")]
        public List<T> Results { get; set; } = new();
    }
    public class RawDtos<C> 
    {
        [JsonPropertyName ("id")]
        public int Id { get; set; }
        [JsonPropertyName("slug")]
        public string Slug { get; set; } = string.Empty;
        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;
        [JsonPropertyName ("released")]
        public string? Released { get; set; }
        [JsonPropertyName ("background_image")]
        public string? BackgroundImage { get; set; }
        [JsonPropertyName ("rating")]
        public double Rating { get; set; }
        [JsonPropertyName ("metacritic")]
        public int? Metacritic { get; set; }

        [JsonPropertyName("playtime")]
        public int? Playtime { get; set; }

        [JsonPropertyName("platforms")]
       
        public List<C> Platforms { get; set; } = new();

    }
    public class Plataforms 
    {
        [JsonPropertyName("platform")]
        public Plataforma Plataforma { get; set; } = new();
        [JsonPropertyName("released_at")]
        public string? releasedAt { get; set; }
        [JsonPropertyName("requirements")]
        public object? Requirements { get; set; }
    }
}
