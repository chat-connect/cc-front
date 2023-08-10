import { ChannelList } from "@/domain/entity/channel/channelList"
import { ApiClient } from "@/infra/api/apiClient";

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();

    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string | undefined = event.context.params?.userKey;
    const roomKey: string | undefined = event.context.params?.roomKey;
    
    const response: ChannelList = await apiClient.get(config.public.CcServerUrl + "/channel/" + userKey + "/list_channel/" + roomKey, authorizationHeader);

    return response
})
