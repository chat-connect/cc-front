import { User } from "@/domain/entity/user/user"
import { ApiClient } from "@/infra/api/apiClient";

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();

    const req = event.req;
    const authorizationHeader = req.headers.authorization;
    const userKey: string = event.context.params?.userKey;
    const body = await readBody(event)

    const response: User = await apiClient.put(config.public.GcServerUrl + "/user/" + userKey + "/update_user", body, authorizationHeader);

    return response;
});
