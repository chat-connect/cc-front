export interface CreateRoom {
    types: string;
    status: number;
    items: {
        room_key: string;
        name: string;
        explanation: string;
        image_path: string;
        user_count: number;
        status: string;
        message: string;
    };
}
