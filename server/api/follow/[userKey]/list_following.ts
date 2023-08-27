import { ListFollowing } from '@/domain/entity/follow/listFollowing';
import { ApiClient } from "@/infra/api/apiClient"

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();
    
    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string = event.context.params?.userKey;

    const response: ListFollowing = await apiClient.get(config.public.GcServerUrl + "/follow/" + userKey + "/list_following",  authorizationHeader);

    return response
})
