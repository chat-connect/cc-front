export interface Room {
    room_key:    string;
    name:        string;
    description: string;
    status:      string;
    genre:       string;
    game:        string;
}

export interface ListRoom {
    types:  string;
    status: number;
    items: {
        list:    Room[];
        message: string;
    };
}
