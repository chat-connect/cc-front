export interface UserLogout {
    types: string;
    status: number;
    items: {
        message: string;
    };
}

export default defineEventHandler(async (event) => {
    const req = event.req
    const authorizationHeader = req.headers.authorization
    const config = useRuntimeConfig()
    const userKey: string | undefined = event.context.params?.userKey;
    const url: string = config.public.CcServerUrl + "/auth/user_logout/" + userKey
    const result: UserLogout[] = await $fetch(url, {
        method: "PUT",
        headers: {
            Authorization: authorizationHeader
        },
    })

    return result
})
