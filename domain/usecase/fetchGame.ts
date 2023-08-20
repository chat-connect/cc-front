import { ListGameUser } from "@/domain/entity/game/listGameUser"
import { ListGameScore } from "@/domain/entity/game/listGameScore"
import { ApiClient } from "@/infra/api/apiClient"

export class FetchGame {
    private apiClient: ApiClient

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    // listGameUser 連携中ゲーム一覧
    async listGameUser(userKey: string): ListGameUser {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: ListGameUser = await this.apiClient.get(config.public.GcWebUrl + "/api/game/" + userKey + "/list_game_user", access_token.value)
        
        return response
    }

        // listGameScore ゲームスコア一覧
    async listGameScore(userKey: string, gameKey: string): ListGameScore {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: ListGameScore = await this.apiClient.get(config.public.GcWebUrl + "/api/game/" + userKey + "/list_game_score/" + gameKey, access_token.value)
        
        return response
    }
}
