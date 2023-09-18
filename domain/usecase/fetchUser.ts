import { User } from "@/domain/entity/user/user"
import { SearchUser } from "@/domain/entity/user/searchUser"
import { ApiClient } from "@/infra/api/apiClient"

export class FetchUser {
    private apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }

    // registerUser ユーザー登録
    async registerUser(request: any): Promise<User> {
        const config = useRuntimeConfig();
        const response: User = await this.apiClient.post(config.public.GcWebUrl + "/api/auth/register_user", request, null);

        return response;
    }

    // loginUser ログイン
    async loginUser(request: any): Promise<User> {
        const config = useRuntimeConfig();
        const response: User = await this.apiClient.post(config.public.GcWebUrl + "/api/auth/login_user", request, null);

        return response;
    }

    // logoutUser ログアウト
    async logoutUser(userKey: string): Promise<User> {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token');
        const response: User = await this.apiClient.put(config.public.GcWebUrl + "/api/auth/logout_user/" + userKey, null, access_token.value);

        return response;
    }

    // updateUser ユーザー更新
    async updateUser(userKey: string, request: any): Promise<User> {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token');
        const response: User = await this.apiClient.put(config.public.GcWebUrl + "/api/user/" + userKey + "/update_user", request, access_token.value);
        
        return response;
    }

    // searchRoom ユーザー検索
    async searchUser(userKey: string, name: string): Promise<SearchUser> {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: SearchUser = await this.apiClient.get(config.public.GcWebUrl + "/api/user/" + userKey + "/search_user?name=" + name, access_token.value)
        
        return response;
    }
}
