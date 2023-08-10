export class ApiClient {
    async post(url: string, data: any, token: string): Promise<any> {
        const response = await $fetch(url, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
            body: data,
        });

        return response;
    }

    async put(url: string, data: any, token: string): Promise<any> {
        const response = await $fetch(url, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
            },
            body: data,
        });

        return response;
    }

    async get(url: string, token: string): Promise<any> {
        const response = await $fetch(url, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        });

        return response;
    }

    async delete(url: string, token: string): Promise<any> {
        const response = await $fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        });

        return response;
    }
}

const apiClient = new ApiClient();
export default apiClient;