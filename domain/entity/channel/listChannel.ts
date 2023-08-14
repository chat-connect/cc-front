export interface Channel {
    channel_key: string;
    type: string;
    name: string;
    description: string;
}

export interface ListChannel {
    types: string;
    status: number;
    items: {
        room_key: string;
        list: Channel[];
        message: string;
    };
}
