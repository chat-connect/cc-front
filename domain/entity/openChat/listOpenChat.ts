export interface OpenChat {
    open_chat_key: string;
    user_key:      string;
    user_name:     string;
    content:       string;
    image_path:    string;
    postet_at:     string;
}

export interface ListOpenChat {
    types:  string;
    status: number;
    items: {
        list:     OpenChat[];
        message:  string;
    };
}
