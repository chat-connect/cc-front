import { ListGenreAndGame } from "@/domain/entity/genre/listGenreAndGame"
import { ApiClient } from "@/infra/api/apiClient"

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();
    
    const response: ListGenreAndGame = await apiClient.get(config.public.GcGameUrl + "/genre/list_genre_and_game", null);

    return response
})
