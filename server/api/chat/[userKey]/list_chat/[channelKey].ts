import { ListChat } from "@/domain/entity/channel/listChat"
import { ApiClient } from "@/infra/api/apiClient";

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();

    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string = event.context.params?.userKey;
    const channelKey: string = event.context.params?.channelKey;
    
    const response: ListChat = await apiClient.get(config.public.GcServerUrl + "/chat/" + userKey + "/list_chat/" + channelKey, authorizationHeader);

    return response
})
