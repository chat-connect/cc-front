export interface ListRoom {
    types:  string;
    status: number;
    items: {
        list:    Room[];
        message: string;
    };
}

export interface Room {
    room_key:    string;
    name:        string;
    description: string;
    status:      string;
    genre:       Genre;
    game:        Game;
}

export interface Genre {
    genre_key:   string;
    name:        string;
    description: string;
    type:        string;
}

export interface Game {
    game_key:    string;
    genre_key:   string;
    name:        string;
    description: string;
    type:        string;
}