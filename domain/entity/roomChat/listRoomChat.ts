export interface RoomChat {
    room_chat_key: string;
    user_key:      string;
    user_name:     string;
    content:       string;
    image_path:    string;
    postet_at:     string;
}

export interface ListRoomChat {
    types:  string;
    status: number;
    items: {
        room_key: string;
        list:     RoomChat[];
        message:  string;
    };
}
