import { defineStore } from "pinia";
import { ListChannelChat, ChannelChat } from "@/domain/entity/channelChat/listChannelChat";

export const useListChannelChatStore = defineStore("listChannelChat", {
    state: () => {
        return {
            listChannelChat: {
                types: "",
                status: 0,
                items: {
                    channel_key: "",
                    list: [] as ChannelChat[],
                    message: ""
                }
            }
        };
    },
    persist: true,
    getters: {
        double: (state) => {
            return state.listChannelChat;
        }
    },
    actions: {
        update(listChannelChat: ListChannelChat) {
            this.listChannelChat = {
                types: listChannelChat.types,
                status: listChannelChat.status,
                items: {
                    channel_key: listChannelChat.channel_key,
                    list: [] as ChannelChat[],
                    message: listChannelChat.message,
                }
            };

            for (const chat of listChannelChat.items.list) {
                this.listChannelChat.items.list.push(chat);
            }
        },
        delete() {
            this.listChannelChat = {
                types: "",
                status: 0,
                items: {
                    channel_key: "",
                    list: [] as ChannelChat[],
                    message: ""
                }
            }
        }
    }
});
