import { ListRoomChat } from "@/domain/entity/roomChat/listRoomChat"
import { ApiClient } from "@/infra/api/apiClient";

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();

    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string = event.context.params?.userKey;
    const roomKey: string = event.context.params?.roomKey;
    
    const response: ListRoomChat = await apiClient.get(config.public.GcServerUrl + "/room_chat/" + userKey + "/list_room_chat/" + roomKey, authorizationHeader);

    return response
})
