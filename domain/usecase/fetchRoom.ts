import { RoomList } from "@/domain/entity/room/roomList"
import { ApiClient } from "@/infra/api/apiClient"

export class FetchRoom {
    private apiClient: ApiClient

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    // roomList ルーム一覧
    async roomList(userKey: string): RoomList {
        const access_token = useCookie('access_token')
        const response: RoomList = await this.apiClient.get("/api/room/" + userKey + "/room_list", access_token.value)
        
        return response
    }
}
