using SaveRoom.Models;
using SaveRoom.Models.Dtos;
using SaveRoom.Models.Filters;

namespace SaveRoom.Services.Interfaces
{
    public interface IRawgApiService
    {
        Task<RawgResponseDto<RawDtos<Plataforms>>?> ObterJogosAsync(RawGameFilter filter);
    }
    
}
