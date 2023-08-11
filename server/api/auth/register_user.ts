import { User } from "@/domain/entity/user/user"
import { ApiClient } from "@/infra/api/apiClient";

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();

    const body = await readBody(event)

    const response: User = await apiClient.post(config.public.GcServerUrl + "/auth/register_user", body, null);

    return response;
})
