import { ListFollowing } from '@/domain/entity/follow/listFollowing';
import { CountFollowingAndFollowers } from '@/domain/entity/follow/countFollowingAndFollowers';
import { ApiClient } from "@/infra/api/apiClient"

export class FetchFollow {
    private apiClient: ApiClient

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    async listFollowers(userKey: string): ListFollowers {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: ListFollowers = await this.apiClient.get(config.public.GcWebUrl + "/api/follow/" + userKey + "/list_followers", access_token.value)
        
        return response
    }

    async listFollowing(userKey: string): ListFollowing {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: ListFollowing = await this.apiClient.get(config.public.GcWebUrl + "/api/follow/" + userKey + "/list_following", access_token.value)
        
        return response
    }

    // countFollowingAndFollowers フォロワー数とフォロワー数を取得する
    async countFollowingAndFollowers(userKey: string): CountFollowingAndFollowers {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: CountFollowingAndFollowers = await this.apiClient.get(config.public.GcWebUrl + "/api/follow/" + userKey + "/count_following_and_followers", access_token.value)
        
        return response
    }
}
