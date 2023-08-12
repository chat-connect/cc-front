export interface CreateChat {
    types:  string;
    status: number;
    items: {
        chat_key:    string;
        channel_key: string;
        content:     string;
        postet_at:   string;
        message:     string;
    };
}
