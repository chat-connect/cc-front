import { CreateFollow } from '@/domain/entity/follow/createFollow';
import { DeleteFollow } from '@/domain/entity/follow/deleteFollow';
import { ListFollowing } from '@/domain/entity/follow/listFollowing';
import { ListFollowers } from '@/domain/entity/follow/listFollowers';
import { CountFollowingAndFollowers } from '@/domain/entity/follow/countFollowingAndFollowers';
import { ApiClient } from "@/infra/api/apiClient"

export class FetchFollow {
    private apiClient: ApiClient

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    async createFollow(body: any, userKey: string): CreateFollow {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token');
        const response: CreateFollow = await this.apiClient.post(config.public.GcWebUrl + "/api/follow/" + userKey + "/create_follow", body, access_token.value)
        
        return response
    }

    async deleteFollow(body: any, userKey: string): DeleteFollow {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token');
        const response: DeleteFollow = await this.apiClient.put(config.public.GcWebUrl + "/api/follow/" + userKey + "/delete_follow", body, access_token.value)
        
        return response
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
