import { SearchUser } from "@/domain/entity/user/searchUser"
import { ApiClient } from "@/infra/api/apiClient";

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();

    const req = event.req;
    const authorizationHeader = req.headers.authorization;
    const userKey: string = event.context.params?.userKey;
    const query = getQuery(event)

    const response: SearchUser = await apiClient.get(config.public.GcServerUrl + "/user/" + userKey + "/search_user?name=" + query.name, authorizationHeader);

    return response;
});
