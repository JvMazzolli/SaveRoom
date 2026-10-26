using SaveRoom.Models.Dtos;
using SaveRoom.Models.Filters;

namespace SaveRoom.Services.Interfaces
{
    public interface IRawgApiService
    {
        Task<RawgGameDetailsDto?> ObterDetalhesdosJogos(int id);
        Task<RawgResponseDto<RawDtos<Platforms>>?> ObterJogosAsync(RawGameFilter filter);
        Task<List<RawgAchievementDto>> ObterConquistasDoJogoAsync(int idRawg);
    }
}