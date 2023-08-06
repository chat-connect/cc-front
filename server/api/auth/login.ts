import { UserLogin } from "@/domain/entity/userLogin"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const config = useRuntimeConfig()
    const url: string = config.public.CcServerUrl + "/auth/user_login"
    const result: UserLogin[] = await $fetch(url, {
        method: "POST",
        body: body,
    })

    return result
})
