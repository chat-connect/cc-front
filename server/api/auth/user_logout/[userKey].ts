import { User } from "@/domain/entity/user"

export default defineEventHandler(async (event) => {
    const req = event.req
    const authorizationHeader = req.headers.authorization
    const config = useRuntimeConfig()
    const userKey: string | undefined = event.context.params?.userKey;
    const url: string = config.public.CcServerUrl + "/auth/user_logout/" + userKey
    const result: User[] = await $fetch(url, {
        method: "PUT",
        headers: {
            Authorization: authorizationHeader
        },
    })

    return result
})
