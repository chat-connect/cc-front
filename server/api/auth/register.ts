export interface UserRegister {
    types: string;
    status: number;
    items: {
        user_key: string;
        name: string;
        email: string;
        message: string;
    };
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const config = useRuntimeConfig()
    const url: string = config.public.CcServerUrl + "/auth/user_register"
    const result: UserRegister[] = await $fetch(url, {
        method: "POST",
        body: body,
    })

    return result
})
