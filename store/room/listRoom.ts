import { defineStore } from "pinia";
import { ListRoom, Room } from "@/domain/entity/room/listRoom";

export const useListRoomStore = defineStore("listRoom", {
    state: () => {
        return {
            listRoom: {
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
            return state.listRoom;
        },
    },
    actions: {
        update(listRoom: ListRoom) {
            this.listRoom = {
                types: listRoom.types,
                status: listRoom.status,
                items: {
                list: [],
                    message: listRoom.message
                },
            };

            for (const room of listRoom.items.list) {
                this.listRoom.items.list.push(room);
            }
        },
        delete() {
            this.listRoom = {
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
