interface CreateFollow {
    types:  string;
    status: number;
    items: {
        follow_key:         string;
        user_key:           string;
        following_user_key: string;
        mutual:             boolean;
        mutual_follow_key:  string;
        message:            string;
    };
}
