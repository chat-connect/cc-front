import { CountFollowingAndFollowers } from '@/domain/entity/follow/countFollowingAndFollowers';
import { ApiClient } from "@/infra/api/apiClient"

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();
    
    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string = event.context.params?.userKey;

    const response: CountFollowingAndFollowers = await apiClient.get(config.public.GcServerUrl + "/follow/" + userKey + "/count_following_and_followers",  authorizationHeader);

    return response
})
