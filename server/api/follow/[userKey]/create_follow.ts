import { CreateFollow } from '@/domain/entity/follow/createFollow';
import { ApiClient } from "@/infra/api/apiClient"

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();
    
    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string = event.context.params?.userKey;
    const body = await readBody(event)

    const response: CreateFollow = await apiClient.post(config.public.GcServerUrl + "/follow/" + userKey + "/create_follow",  body, authorizationHeader);

    return response
})
