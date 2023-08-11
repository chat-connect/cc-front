import { CreateChat } from "@/domain/entity/channel/createChat"
import { ApiClient } from "@/infra/api/apiClient";

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();

    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string = event.context.params?.userKey;
    const channelKey: string = event.context.params?.channelKey;
    const body = await readBody(event)
    
    const response: CreateChat = await apiClient.post(config.public.GcServerUrl + "/chat/" + userKey + "/create_chat/" + channelKey, body, authorizationHeader);

    return response
})
