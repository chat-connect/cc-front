import { defineStore } from "pinia";
import { RoomList, Room } from "@/domain/entity/room/roomList";

export const useRoomListStore = defineStore("roomList", {
    state: () => {
        return {
            roomList: {
                types: "",
                status: 0,
                items: {
                    list: [] as Room[],
                    message: ""
                },
            },
        };
    },
    persist: true,
    getters: {
        double: (state) => {
            return state.roomList;
        },
    },
    actions: {
        update(roomList: RoomList) {
            this.roomList = {
                types: roomList.types,
                status: roomList.status,
                items: {
                list: [],
                    message: roomList.message
                },
            };

            for (const room of roomList.items.list) {
                this.roomList.items.list.push(room);
            }
        },
        delete() {
            this.roomList = {
                types: "",
                status: 0,
                items: {
                    list: [],
                    message: ""
                },
            }
        }
    },
});
