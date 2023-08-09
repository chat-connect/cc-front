import { RoomList } from "@/domain/entity/room/roomList"
import { RoomCreate } from "@/domain/entity/room/roomCreate"
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

    // roomCreate ルーム作成
    async roomCreate(body: any, userKey: string): RoomCreate {
        const access_token = useCookie('access_token')
        const response: RoomCreate = await this.apiClient.post("/api/room/" + userKey + "/room_create", body, access_token.value)

        return response
    }
}
