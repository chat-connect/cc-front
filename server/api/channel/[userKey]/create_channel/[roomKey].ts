import { ChannelCreate } from "@/domain/entity/channel/channelCreate"
import { ApiClient } from "@/infra/api/apiClient";

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();

    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string = event.context.params?.userKey;
    const roomKey: string = event.context.params?.roomKey;
    const body = await readBody(event)
    
    const response: ChannelCreate = await apiClient.post(config.public.GcServerUrl + "/channel/" + userKey + "/create_channel/" + roomKey, body, authorizationHeader);

    return response
})
