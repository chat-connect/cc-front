import { RoomCreate } from "@/domain/entity/room/roomCreate"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string | undefined = event.context.params?.userKey;
    
    const config = useRuntimeConfig()
    const url: string = config.public.CcServerUrl + "/room/" + userKey + "/room_create"
    const result: RoomCreate[] = await $fetch(url, {
        method: "POST",
        body: body,
        headers: {
            Authorization: authorizationHeader
        },
    })

    return result
})
