import { ChannelCreate } from "@/domain/entity/channel/channelCreate"

export default defineEventHandler(async (event) => {
    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string | undefined = event.context.params?.userKey;
    const roomKey: string | undefined = event.context.params?.roomKey;
    const body = await readBody(event)
    
    const config = useRuntimeConfig()
    const url: string = config.public.CcServerUrl + "/channel/" + userKey + "/channel_create/" + roomKey
    const result: ChannelCreate[] = await $fetch(url, {
        method: "POST",
        body: body,
        headers: {
            Authorization: authorizationHeader
        },
    })

    return result
})
