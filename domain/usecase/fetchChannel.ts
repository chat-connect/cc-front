import { ChannelList } from "@/domain/entity/channel/channelList"
import { ChannelCreate } from "@/domain/entity/channel/channelCreate"
import { ApiClient } from "@/infra/api/apiClient"

export class FetchChannel {
    private apiClient: ApiClient

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    // listChannel チャンネル一覧
    async listChannel(userKey: string, roomKey: string): ChannelList {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: ChannelList = await this.apiClient.get(config.public.GcWebUrl + "/api/channel/" + userKey + "/list_channel/" + roomKey, access_token.value)
        
        return response
    }

    // createChannel チャンネル作成
    async createChannel(body: any, userKey: string, roomKey: string): ChannelCreate {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: ChannelCreate = await this.apiClient.post(config.public.GcWebUrl + "/api/channel/" + userKey + "/create_channel/" + roomKey, body, access_token.value)

        return response
    }
}
