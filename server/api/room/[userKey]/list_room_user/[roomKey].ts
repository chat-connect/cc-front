import { ListRoom } from "@/domain/entity/room/listRoomUser";
import { ApiClient } from "@/infra/api/apiClient";

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();

    const req = event.req;
    const authorizationHeader = req.headers.authorization;
    const userKey: string = event.context.params?.userKey;
    const roomKey: string = event.context.params?.roomKey;
    
    const response: ListRoomUser = await apiClient.get(config.public.GcServerUrl + "/room/" + userKey + "/list_room_user/" + roomKey, authorizationHeader);

    return response;
});
