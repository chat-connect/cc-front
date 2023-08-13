import { ListRoomChat } from "@/domain/entity/roomChat/listRoomChat"
import { ApiClient } from "@/infra/api/apiClient"

export class FetchRoomChat {
    private apiClient: ApiClient

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    // listRoomChat チャット一覧
    async listRoomChat(userKey: string, roomKey: string): ListRoomChat {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: ListRoomChat = await this.apiClient.get(config.public.GcWebUrl + "/api/room_chat/" + userKey + "/list_room_chat/" + roomKey, access_token.value)
        
        return response
    }
}
