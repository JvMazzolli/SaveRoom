using System.Text.Json.Serialization;

namespace SaveRoom.Models.Dtos
{
    public class RawgResponseDto<T>
    {
        [JsonPropertyName("count")]
        public int Count { get; set; }

        [JsonPropertyName("next")]
        public string? Next { get; set; }

            [JsonPropertyName("previous")]
        public string? Previous { get; set; }

        [JsonPropertyName("results")]
        public List<T> Results { get; set; } = new();
    }

    public class RawDtos<T>
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("slug")]
        public string Slug { get; set; } = string.Empty;

        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("released")]
        public string? Released { get; set; }

        [JsonPropertyName("background_image")]
        public string? BackgroundImage { get; set; }

        [JsonPropertyName("rating")]
        public double Rating { get; set; }

        [JsonPropertyName("metacritic")]
        public int? Metacritic { get; set; }

        [JsonPropertyName("playtime")]
        public int? Playtime { get; set; }

        [JsonPropertyName("platforms")]
        public List<T> Platforms { get; set; } = new();
    }

    public class Platforms
    {
        [JsonPropertyName("platform")]
        public RawgPlatformDto Platform { get; set; } = new();

        [JsonPropertyName("released_at")]
        public string? ReleasedAt { get; set; }

        [JsonPropertyName("requirements")]
        public object? Requirements { get; set; }
    }

    public class RawgGameDetailsDto
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("description")]
        public string? Description { get; set; }

        [JsonPropertyName("background_image")]
        public string? BackgroundImage { get; set; }

        [JsonPropertyName("rating")]
        public double? Rating { get; set; }

        [JsonPropertyName("metacritic")]
        public int? Metacritic { get; set; }

        [JsonPropertyName("developers")]
        public List<RawCompanyDto> Developers { get; set; } = new();

        [JsonPropertyName("publishers")]
        public List<RawCompanyDto> Publishers { get; set; } = new();

        [JsonPropertyName("platforms")]
        public List<RawgPlatformContainerDto> Platforms { get; set; } = new();
    }

    public class RawCompanyDto
    {
        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;
    }

    public class RawgPlatformContainerDto
    {
        [JsonPropertyName("platform")]
        public RawgPlatformDto Platform { get; set; } = new();
    }

    public class RawgPlatformDto
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("slug")]
        public string Slug { get; set; } = string.Empty;
    }

    public class RawgAchievementResponseDto
    {
        [JsonPropertyName("count")]
        public int Count { get; set; }

        [JsonPropertyName("results")]
        public List<RawgAchievementDto> Results { get; set; } = new();
    }

    public class RawgAchievementDto
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("image")]
        public string Image { get; set; } = string.Empty;

        [JsonPropertyName("percent")]
        public string Percent { get; set; } = "0";
    }
}
    