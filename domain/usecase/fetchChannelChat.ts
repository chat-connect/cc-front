import { ListChannelChat } from "@/domain/entity/channelChat/listChannelChat"
import { ApiClient } from "@/infra/api/apiClient"

export class FetchChannelChat {
    private apiClient: ApiClient

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    // listChat チャット一覧
    async listChannelChat(userKey: string, channelKey: string): ListChannelChat {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: ListChannelChat = await this.apiClient.get(config.public.GcWebUrl + "/api/channel_chat/" + userKey + "/list_channel_chat/" + channelKey, access_token.value)
        
        return response
    }
}
