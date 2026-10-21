namespace SaveRoom.Models.Filters
{
    public class RawGameFilter // Aqui é os filtros que vocês vão utilizar para puxar coisas da API. Para utilizar como base é somente olhar o Get a list of games da API.
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public string? Search { get; set; }
        public bool? SearchPrecise { get; set; }
        public bool? SearchExact { get; set; }
        public string? Platforms { get; set; }
        public string? Genres { get; set; }
        public string? Ordering { get; set; }
        public string? Dates { get; set; }
    }
}
