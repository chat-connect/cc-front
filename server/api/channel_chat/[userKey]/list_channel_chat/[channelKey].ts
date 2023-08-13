import { ListChannelChat } from "@/domain/entity/channelChat/listChannelChat"
import { ApiClient } from "@/infra/api/apiClient";

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();

    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string = event.context.params?.userKey;
    const channelKey: string = event.context.params?.channelKey;
    
    const response: ListChannelChat = await apiClient.get(config.public.GcServerUrl + "/channel_chat/" + userKey + "/list_channel_chat/" + channelKey, authorizationHeader);

    return response
})
