export interface Channel {
    channel_key: string;
    type: string;
    name: string;
    explanation: string;
}

export interface ChannelList {
    types: string;
    status: number;
    items: {
        room_key: string;
        list: Channel[];
        message: string;
    };
}
