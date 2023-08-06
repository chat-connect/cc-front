export class ApiClient {
    async post(path: string, data: any, token: string): Promise<any> {
        const config = useRuntimeConfig()
        const url: string = config.public.CcFrontUrl + path
        const response = await $fetch(url, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
            body: data,
        })

        return response
    }

    async put(path: string, data: any, token: string): Promise<any> {
        const config = useRuntimeConfig()
        const url: string = config.public.CcFrontUrl + path
        const response = await $fetch(url, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
            },
            body: data,
        })

        return response
    }
}

const apiClient = new ApiClient()
export default apiClient
