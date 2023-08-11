import { ListChannel } from "@/domain/entity/channel/listChannel"
import { ApiClient } from "@/infra/api/apiClient";

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();

    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string = event.context.params?.userKey;
    const roomKey: string = event.context.params?.roomKey;
    
    const response: ListChannel = await apiClient.get(config.public.GcServerUrl + "/channel/" + userKey + "/list_channel/" + roomKey, authorizationHeader);

    return response
})
