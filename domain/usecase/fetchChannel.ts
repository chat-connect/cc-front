import { ListChannel } from "@/domain/entity/channel/listChannel"
import { CreateChannel } from "@/domain/entity/channel/createChannel"
import { ApiClient } from "@/infra/api/apiClient"

export class FetchChannel {
    private apiClient: ApiClient

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    // listChannel チャンネル一覧
    async listChannel(userKey: string, roomKey: string): ListChannel {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: ListChannel = await this.apiClient.get(config.public.GcWebUrl + "/api/channel/" + userKey + "/list_channel/" + roomKey, access_token.value)
        
        return response
    }

    // createChannel チャンネル作成
    async createChannel(body: any, userKey: string, roomKey: string): CreateChannel {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: CreateChannel = await this.apiClient.post(config.public.GcWebUrl + "/api/channel/" + userKey + "/create_channel/" + roomKey, body, access_token.value)

        return response
    }
}
