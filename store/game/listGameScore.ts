import { defineStore } from "pinia";
import { ListGameScore, GameScore } from "@/domain/entity/game/listGameScore";

export const useListGameScoreStore = defineStore("listGameScore", {
    state: () => {
        return {
            listGameScore: {
                types: "",
                status: 0,
                items: {
                    game_key: "",
                    game_title: "",
                    game_image_path: "",
                    setting: {
                        game_score: false,
                        game_combo_score: false,
                        game_rank: false,
                        game_play_time: false,
                        game_score_image_path: false,
                    },
                    list: [] as GameScore[],
                    message: ""
                }
            }
        };
    },
    persist: true,
    getters: {
        gameScores: (state) => {
            return state.listGameScore;
        }
    },
    actions: {
        update(listGameScore: ListGameScore) {
            this.listGameScore = {
                types: listGameScore.types,
                status: listGameScore.status,
                items: {
                    game_key: listGameScore.items.game_key,
                    game_title: listGameScore.items.game_title,
                    game_image_path: listGameScore.items.game_image_path,
                    setting: { ...listGameScore.items.setting },
                    list: [] as GameScore[],
                    message: listGameScore.items.message,
                }
            };

            for (const gameScore of listGameScore.items.list) {
                this.listGameScore.items.list.push(gameScore);
            }
        },
        delete() {
            this.listGameScore = {
                types: "",
                status: 0,
                items: {
                    game_key: "",
                    game_title: "",
                    game_image_path: "",
                    setting: {
                        game_score: false,
                        game_combo_score: false,
                        game_rank: false,
                        game_play_time: false,
                        game_score_image_path: false,
                    },
                    list: [] as GameScore[],
                    message: ""
                }
            };
        }
    }
});