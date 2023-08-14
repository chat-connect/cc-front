export interface Room {
    room_key:    string;
    name:        string;
    description: string;
    status:      string;
}

export interface ListRoom {
    types:  string;
    status: number;
    items: {
        list:    Room[];
        message: string;
    };
}
