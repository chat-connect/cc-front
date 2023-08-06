import { RoomList } from "@/domain/entity/room/roomList"

export default defineEventHandler(async (event) => {
    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string | undefined = event.context.params?.userKey;
    
    const config = useRuntimeConfig()
    const url: string = config.public.CcServerUrl + "/room/" + userKey + "/room_list"
    const result: RoomList[] = await $fetch(url, {
        method: "GET",
        headers: {
            Authorization: authorizationHeader
        },
    })

    return result
})
