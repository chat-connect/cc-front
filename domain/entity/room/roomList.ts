export interface Room {
    room_key: string;
    name: string;
    explanation: string;
}

export interface RoomList {
    types: string;
    status: number;
    items: {
        list: Room[];
        message: string;
    };
}
