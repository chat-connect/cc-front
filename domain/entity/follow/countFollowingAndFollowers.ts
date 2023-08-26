interface CountFollowingAndFollowers {
    types:  string;
    status: number;
    items: {
        user_key:        string;
        following_count: number;
        followers_count: number;
        message:         string;
    };
}
