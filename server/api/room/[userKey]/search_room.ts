import { ListRoom } from "@/domain/entity/room/listRoom";
import { ApiClient } from "@/infra/api/apiClient";

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();

    const req = event.req;
    const authorizationHeader = req.headers.authorization;
    const userKey: string = event.context.params?.userKey;
    const query = getQuery(event)

    const response: ListRoom = await apiClient.get(config.public.GcServerUrl + "/room/" + userKey + "/search_room?name=" + query.name + "&genre=" + query.genre + "&game=" + query.game, authorizationHeader);

    return response;
});
