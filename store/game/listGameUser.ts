import { defineStore } from "pinia";
import { ListGameUser, GameUser } from "@/domain/entity/game/listGameUser";

export const useListGameUserStore = defineStore("listGameUser", {
    state: () => {
        return {
            listGameUser: {
                types: "",
                status: 0,
                items: {
                    list: [] as GameUser[],
                    message: ""
                }
            }
        };
    },
    persist: true,
    getters: {
        gameUsers: (state) => {
            return state.listGameUser;
        }
    },
    actions: {
        update(listGameUser: ListGameUser) {
            this.listGameUser = {
                types: listGameUser.types,
                status: listGameUser.status,
                items: {
                    list: [...listGameUser.items.list],
                    message: listGameUser.items.message
                }
            };
        },
        delete() {
            this.listGameUser = {
                types: "",
                status: 0,
                items: {
                    list: [] as GameUser[],
                    message: ""
                }
            };
        }
    }
});
