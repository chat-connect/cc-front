import { ListGenreAndGame } from "@/domain/entity/genre/listGenreAndGame"
import { ApiClient } from "@/infra/api/apiClient"

export class FetchGenre {
    private apiClient: ApiClient

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    // listGenreAndGame ジャンル＆ゲーム一覧
    async listGenreAndGame(): ListGenreAndGame {
        const config = useRuntimeConfig();
        const response: ListGenreAndGame = await this.apiClient.get(config.public.GcWebUrl + "/api/genre/list_genre_and_game", null)
        
        return response
    }
}
