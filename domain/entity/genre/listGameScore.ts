export interface Setting {
    game_score:            boolean;
    game_combo_score:      boolean;
    game_rank:             boolean;
    game_play_time:        boolean;
    game_score_image_path: boolean;
}

export interface GameScore {
    game_score:            string;
    game_combo_score:      string;
    game_rank:             string;
    game_play_time:        number;
    game_score_image_path: string;
}

export interface ListGameScore {
    game_key:        string;
    game_title:      string;
    game_image_path: string;
    setting:         Setting;
    list:            GameScore[];
    message:         string;
}
