import { ListGameUser } from "@/domain/entity/game/listGameUser"
import { ApiClient } from "@/infra/api/apiClient"

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();
    
    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string = event.context.params?.userKey;

    const response: ListGameUser = await apiClient.get(config.public.GcGameUrl + "/game/" + userKey + "/list_game_user",  authorizationHeader);

    return response
})
