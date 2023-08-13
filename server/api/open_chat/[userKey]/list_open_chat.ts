import { ListOpenChat } from "@/domain/entity/openChat/listOpenChat"
import { ApiClient } from "@/infra/api/apiClient";

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();

    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string = event.context.params?.userKey;
    
    const response: ListOpenChat = await apiClient.get(config.public.GcServerUrl + "/open_chat/" + userKey + "/list_open_chat", authorizationHeader);

    return response
})
