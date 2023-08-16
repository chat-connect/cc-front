export interface CreateRoom {
    types:  string;
    status: number;
    items: {
        room_key:    string;
        name:        string;
        description: string;
        image_path:  string;
        user_count:  number;
        status:      string;
        genre:       string;
        game:        string;
        message:     string;
    };
}
