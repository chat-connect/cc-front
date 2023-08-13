import { defineStore } from "pinia";
import { ListRoomChat, RoomChat } from "@/domain/entity/roomChat/listRoomChat";

export const useListRoomChatStore = defineStore("listRoomChat", {
    state: () => {
        return {
            listRoomChat: {
                types: "",
                status: 0,
                items: {
                    room_key: "",
                    list: [] as RoomChat[],
                    message: ""
                }
            }
        };
    },
    persist: true,
    getters: {
        double: (state) => {
            return state.listRoomChat;
        }
    },
    actions: {
        update(listRoomChat: ListRoomChat) {
            this.listRoomChat = {
                types: listRoomChat.types,
                status: listRoomChat.status,
                items: {
                    room_key: listRoomChat.room_key,
                    list: [] as RoomChat[],
                    message: listRoomChat.message,
                }
            };

            for (const chat of listRoomChat.items.list) {
                this.listRoomChat.items.list.push(chat);
            }
        },
        delete() {
            this.listRoomChat = {
                types: "",
                status: 0,
                items: {
                    room_key: "",
                    list: [] as RoomChat[],
                    message: ""
                }
            }
        }
    }
});
