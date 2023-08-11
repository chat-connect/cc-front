import { JoinRoom } from "@/domain/entity/room/joinRoom"
import { ApiClient } from "@/infra/api/apiClient";

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();

    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string = event.context.params?.userKey;
    const roomKey: string = event.context.params?.roomKey;
    
    const response: JoinRoom = await apiClient.post(config.public.GcServerUrl + "/room/" + userKey + "/join_room/" + roomKey, null, authorizationHeader);

    return response
})
