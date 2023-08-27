import { ListFollowers } from '@/domain/entity/follow/listFollowers';
import { ApiClient } from "@/infra/api/apiClient"

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();
    
    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string = event.context.params?.userKey;

    const response: ListFollowers = await apiClient.get(config.public.GcServerUrl + "/follow/" + userKey + "/list_followers",  authorizationHeader);

    return response
})
