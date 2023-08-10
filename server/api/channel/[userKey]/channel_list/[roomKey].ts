import { ChannelList } from "@/domain/entity/channel/channelList"

export default defineEventHandler(async (event) => {
    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string | undefined = event.context.params?.userKey;
    const roomKey: string | undefined = event.context.params?.roomKey;
    
    const config = useRuntimeConfig()
    const url: string = config.public.CcServerUrl + "/channel/" + userKey + "/channel_list/" + roomKey
    const result: ChannelList[] = await $fetch(url, {
        method: "GET",
        headers: {
            Authorization: authorizationHeader
        },
    })

    return result
})
