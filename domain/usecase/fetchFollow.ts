import { CountFollowingAndFollowers } from '@/domain/entity/follow/countFollowingAndFollowers';
import { ApiClient } from "@/infra/api/apiClient"

export class FetchFollow {
    private apiClient: ApiClient

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    // countFollowingAndFollowers 連携中ゲーム一覧
    async countFollowingAndFollowers(userKey: string): CountFollowingAndFollowers {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: CountFollowingAndFollowers = await this.apiClient.get(config.public.GcWebUrl + "/api/follow/" + userKey + "/count_following_and_followers", access_token.value)
        
        return response
    }
}
