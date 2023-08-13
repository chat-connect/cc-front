import { ListOpenChat } from "@/domain/entity/openChat/listOpenChat"
import { ApiClient } from "@/infra/api/apiClient"

export class FetchOpenChat {
    private apiClient: ApiClient

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    // listRoomChat チャット一覧
    async listOpenChat(userKey: string): ListOpenChat {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: ListOpenChat = await this.apiClient.get(config.public.GcWebUrl + "/api/open_chat/" + userKey + "/list_open_chat", access_token.value)
        
        return response
    }
}
