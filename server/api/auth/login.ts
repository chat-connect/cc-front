import { User } from "@/domain/entity/user"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const config = useRuntimeConfig()
    const url: string = config.public.CcServerUrl + "/auth/user_login"
    const result: User[] = await $fetch(url, {
        method: "POST",
        body: body,
    })

    return result
})
