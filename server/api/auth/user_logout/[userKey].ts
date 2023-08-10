import { User } from "@/domain/entity/user/user"
import { ApiClient } from "@/infra/api/apiClient";

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();

    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string | undefined = event.context.params?.userKey;

    const response: User = await apiClient.put(config.public.CcServerUrl + "/auth/user_logout/" + userKey, null, authorizationHeader);

    return response;
})
