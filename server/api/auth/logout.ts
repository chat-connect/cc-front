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
    const body = await readBody(event)
    const config = useRuntimeConfig()
    const url: string = config.public.CcServerUrl + "/auth/user_logout/" + body.userKey
    const result: UserLogout[] = await $fetch(url, {
        method: "PUT",
        headers: {
            Authorization: authorizationHeader
        },
    })

    return result
})
