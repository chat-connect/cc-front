import { User } from "@/domain/entity/user"
import { ApiClient } from "@/infra/api/apiClient"

export class FetchUser {
    private apiClient: ApiClient

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    // registerUser ユーザー登録
    async registerUser(request: any): Promise<User> {
        const config = useRuntimeConfig();
        const response = await this.apiClient.post(config.public.CcFrontUrl + "/api/auth/register_user", request, null)

        return response as User
    }

    // loginUser ログイン
    async loginUser(request: any): Promise<User> {
        const config = useRuntimeConfig();
        const response = await this.apiClient.post(config.public.CcFrontUrl + "/api/auth/login_user", request, null)

        return response as User
    }

    // logoutUser ログアウト
    async logoutUser(userKey: string): Promise<User> {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response = await this.apiClient.put(config.public.CcFrontUrl + "/api/auth/logout_user/" + userKey, null, access_token.value)

        return response as User
    }
}
