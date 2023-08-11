export interface JoinRoom {
    types: string;
    status: number;
    items: {
        room_user_key: string;
        status: string;
        message: string;
    };
}
