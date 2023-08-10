import { defineStore } from "pinia";
import { ChannelList, Channel } from "@/domain/entity/channel/channelList";

export const useChannelListStore = defineStore("channelList", {
    state: () => {
        return {
            channelList: {
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
            return state.channelList;
        }
    },
    actions: {
        update(channelList: ChannelList) {
            this.channelList = {
                types: channelList.types,
                status: channelList.status,
                items: {
                    room_key: channelList.room_key,
                    list: [],
                    message: channelList.message,
                }
            };

            for (const channel of channelList.items.list) {
                this.channelList.items.list.push(channel);
            }
        },
        delete() {
            this.channelList = {
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
