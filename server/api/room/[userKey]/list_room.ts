import { RoomList } from "@/domain/entity/room/roomList";
import { ApiClient } from "@/infra/api/apiClient";

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();

    const req = event.req;
    const authorizationHeader = req.headers.authorization;
    const userKey: string | undefined = event.context.params?.userKey;
    
    const response: RoomList = await apiClient.get(config.public.GcServerUrl + "/room/" + userKey + "/list_room", authorizationHeader);

    return response;
});