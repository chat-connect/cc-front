import { User } from "@/domain/entity/user/user"
import { ApiClient } from "@/infra/api/apiClient";

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();

    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string = event.context.params?.userKey;

    const response: User = await apiClient.put(config.public.GcAuthUrl + "/auth/logout_user/" + userKey, null, authorizationHeader);

    return response;
})
