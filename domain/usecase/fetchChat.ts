import { ListChat } from "@/domain/entity/channel/listChat"
import { CreateChat } from "@/domain/entity/channel/createChat"
import { ApiClient } from "@/infra/api/apiClient"

export class FetchChat {
    private apiClient: ApiClient

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    // listChat チャット一覧
    async listChat(userKey: string, channelKey: string): ListChat {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: ListChat = await this.apiClient.get(config.public.GcWebUrl + "/api/chat/" + userKey + "/list_chat/" + channelKey, access_token.value)
        
        return response
    }

    // createChat チャット投稿
    async createChat(body: any, userKey: string, channelKey: string): CreateChat {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: CreateChat = await this.apiClient.post(config.public.GcWebUrl + "/api/chat/" + userKey + "/create_chat/" + channelKey, body, access_token.value)

        return response
    }
}
