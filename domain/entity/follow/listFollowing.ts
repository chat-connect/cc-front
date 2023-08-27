export interface Status {
    user_key:   string;
    name:       string;
    image_path: string;
}

export interface Following {
    follow_key:         string;
    user_key:           string;
    following_user_key: string;
    mutual:             boolean;
    mutual_follow_key:  string;
    status:             Status;
}

export interface ListFollowing {
    types:  string;
    status: number;
    items: {
        user_key: string;
        list:     Following[];
        message:  string;
    };
}
