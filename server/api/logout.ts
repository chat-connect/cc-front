type logout = {
    message:  string;
}

export default defineEventHandler(async (event) => {
    const req = event.req
    const authorizationHeader = req.headers.authorization
    const body = await readBody(event)
    const config = useRuntimeConfig()
    const url: string = config.public.CcServerUrl + "/user/" + body.userKey + "/user_logout"
    const result: logout[] = await $fetch(url, {
        method: "PUT",
        headers: {
            Authorization: authorizationHeader
        },
    })

    return result
})
