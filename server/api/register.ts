type register = {
    user_key: string;
    username: string;
    email:    string;
    message:  string;
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const config = useRuntimeConfig()
    const url: string = config.public.CcServerUrl + "/auth/user_register"
    const result: register[] = await $fetch(url, {
        method: "POST",
        body: body,
    })

    return result
})
