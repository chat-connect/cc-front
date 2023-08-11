import { defineStore } from "pinia";
import { ListChannel, Channel } from "@/domain/entity/channel/listChannel";

export const useListChannelStore = defineStore("listChannel", {
    state: () => {
        return {
            listChannel: {
                types: "",
                status: 0,
                items: {
                    room_key: "",
                    list: [] as Channel[],
                    message: ""
                }
            }
        };
    },
    persist: true,
    getters: {
        double: (state) => {
            return state.listChannel;
        }
    },
    actions: {
        update(listChannel: ListChannel) {
            this.listChannel = {
                types: listChannel.types,
                status: listChannel.status,
                items: {
                    room_key: listChannel.room_key,
                    list: [],
                    message: listChannel.message,
                }
            };

            for (const channel of listChannel.items.list) {
                this.listChannel.items.list.push(channel);
            }
        },
        delete() {
            this.listChannel = {
                types: "",
                status: 0,
                items: {
                    room_key: "",
                    list: [],
                    message: ""
                }
            }
        }
    }
});
