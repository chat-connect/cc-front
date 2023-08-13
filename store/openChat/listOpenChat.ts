import { defineStore } from "pinia";
import { ListOpenChat, OpenChat } from "@/domain/entity/openChat/listOpenChat";

export const useListOpenChatStore = defineStore("listOpenChat", {
    state: () => {
        return {
            listOpenChat: {
                types: "",
                status: 0,
                items: {
                    list: [] as OpenChat[],
                    message: ""
                }
            }
        };
    },
    persist: true,
    getters: {
        double: (state) => {
            return state.listOpenChat;
        }
    },
    actions: {
        update(listOpenChat: ListOpenChat) {
            this.listOpenChat = {
                types: listOpenChat.types,
                status: listOpenChat.status,
                items: {
                    list: [] as OpenChat[],
                    message: listOpenChat.message,
                }
            };

            for (const chat of listOpenChat.items.list) {
                this.listOpenChat.items.list.push(chat);
            }
        },
        delete() {
            this.listOpenChat = {
                types: "",
                status: 0,
                items: {
                    list: [] as OpenChat[],
                    message: ""
                }
            }
        }
    }
});
