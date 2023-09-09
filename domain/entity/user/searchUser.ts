export interface SearchUserContent {
    user_key:   string;
    name:       string;
    image_path: string;
    following:  boolean;
}

export interface SearchUser {
    types:  string;
    status: number;
    items: {
        list: SearchUserContent[];
    };
}
