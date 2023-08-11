import { defineStore } from "pinia";
import { ListChat, Chat } from "@/domain/entity/channel/listChat";

export const useListChatStore = defineStore("listChat", {
    state: () => {
        return {
            listChat: {
                types: "",
                status: 0,
                items: {
                    channel_key: "",
                    list: [] as Chat[],
                    message: ""
                }
            }
        };
    },
    persist: true,
    getters: {
        double: (state) => {
            return state.listChat;
        }
    },
    actions: {
        update(listChat: ListChat) {
            this.listChat = {
                types: listChat.types,
                status: listChat.status,
                items: {
                    channel_key: listChat.channel_key,
                    list: [] as Chat[],
                    message: listChat.message,
                }
            };

            for (const chat of listChat.items.list) {
                this.listChat.items.list.push(chat);
            }
        },
        delete() {
            this.listChat = {
                types: "",
                status: 0,
                items: {
                    channel_key: "",
                    list: [] as Chat[],
                    message: ""
                }
            }
        }
    }
});
