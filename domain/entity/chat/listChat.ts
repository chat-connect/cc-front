export interface Chat {
    chat_key:   string;
    user_key:   string;
    user_name:  string;
    content:    string;
    image_path: string;
    postet_at:  string;
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
