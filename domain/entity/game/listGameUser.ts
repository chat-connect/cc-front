interface GameUser {
    game_key:        string;
    game_title:      string;
    game_image_path: string;
}

interface ListGameUser {
    types:  string;
    status: number;
    items: {
        list:    GameUser[];
        message: string;
    };
}
