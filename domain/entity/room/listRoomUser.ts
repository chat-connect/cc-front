export interface Status {
    user_key:   string;
    name:       string;
    image_path: string;
}

export interface RoomUser {
    follow_key:         string;
    user_key:           string;
    following_user_key: string;
    mutual:             boolean;
    mutual_follow_key:  string;
    status:             Status;
}

export interface ListRoomUser {
    types:  string;
    status: number;
    items: {
        user_key: string;
        list:     RoomUser[];
        message:  string;
    };
}
