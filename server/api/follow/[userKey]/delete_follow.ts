import { DeleteFollow } from '@/domain/entity/follow/deleteFollow';
import { ApiClient } from "@/infra/api/apiClient"

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();
    
    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string = event.context.params?.userKey;
    const body = await readBody(event)

    const response: DeleteFollow = await apiClient.put(config.public.GcServerUrl + "/follow/" + userKey + "/delete_follow",  body, authorizationHeader);

    return response
})
