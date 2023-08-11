export interface Chat {
    chat_key:  string;
    user_key:  string;
    user_name: string;
    content:   string;
}

export interface ListChat {
    types:  string;
    status: number;
    items: {
        channel_key: string;
        list:        Chat[];
        message:     string;
    };
}
