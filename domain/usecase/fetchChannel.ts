import { ChannelList } from "@/domain/entity/channel/channelList"
import { ChannelCreate } from "@/domain/entity/channel/channelCreate"
import { ApiClient } from "@/infra/api/apiClient"

export class FetchChannel {
    private apiClient: ApiClient

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    // channelList チャンネル一覧
    async channelList(userKey: string, roomKey: string): ChannelList {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: ChannelList = await this.apiClient.get(config.public.CcFrontUrl + "/api/channel/" + userKey + "/channel_list/" + roomKey, access_token.value)
        
        return response
    }

    // channelCreate チャンネル作成
    async channelCreate(body: any, userKey: string, roomKey: string): ChannelCreate {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: ChannelCreate = await this.apiClient.post(config.public.CcFrontUrl + "/api/channel/" + userKey + "/channel_create/" + roomKey, body, access_token.value)

        return response
    }
}
