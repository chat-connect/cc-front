export interface ChannelChat {
    channel_chat_key: string;
    user_key:         string;
    user_name:        string;
    content:          string;
    image_path:       string;
    postet_at:        string;
}

export interface ListChannelChat {
    types:  string;
    status: number;
    items: {
        channel_key: string;
        list:        ChannelChat[];
        message:     string;
    };
}
