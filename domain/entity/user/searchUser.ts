export interface SearchUserContent {
    user_key:   string;
    name:       string;
    image_path: string;
}

export interface SearchUser {
    types:  string;
    status: number;
    items: {
        list: SearchUserContent[];
    };
}
