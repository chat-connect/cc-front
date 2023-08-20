import { ListGameUser } from "@/domain/entity/game/listGameUser"
import { ApiClient } from "@/infra/api/apiClient"

export class FetchGame {
    private apiClient: ApiClient

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    // listGenreAndGame ジャンル＆ゲーム一覧
    async listGameUser(userKey: string): ListGameUser {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: ListGameUser = await this.apiClient.get(config.public.GcWebUrl + "/api/game/" + userKey + "/list_game_user", access_token.value)
        
        return response
    }
}
