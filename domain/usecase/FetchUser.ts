import { User } from "@/domain/entity/User"
import { ApiClient } from "@/infra/api/apiClient"

export class FetchUser {
    private apiClient: ApiClient

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    // userRegister ユーザー登録
    async register(request: any): Promise<User> {
        const response = await this.apiClient.post("/api/register", request, null)

        return response as User
    }

    // userLogin ログイン
    async login(request: any): Promise<User> {
        const response = await this.apiClient.post("/api/login", request, null)

        return response as User
    }

    // userLogin ログアウト
    async logout(request: any): Promise<User> {
        const access_token = useCookie('access_token')
        const response = await this.apiClient.put("/api/logout", request, access_token.value)

        return response as User
    }
}
