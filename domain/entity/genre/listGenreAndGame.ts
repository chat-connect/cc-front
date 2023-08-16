export interface Genre {
    genre_key:   string;
    tyupe:       string;
    name:        string;
    description: string;
}

export interface Game {
    game_key:    string;
    genre_key:   string;
    tyupe:       string;
    name:        string;
    description: string;
}

export interface ListGenreAndGame {
    types:  string;
    status: number;
    items: {
        list_genre: Genre[];
        list_game:  Game[];
        message:    string;
    };
}
