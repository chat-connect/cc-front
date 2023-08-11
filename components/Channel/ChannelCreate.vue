<template>
    <v-card class="base_card" flat>
        <v-col cols="12">
            <h2>New Channel</h2>
            <v-form>
                <v-text-field label="Name" v-model="name"></v-text-field>
                <v-textarea label="Explanation" v-model="explanation" rows="5"></v-textarea>
                <v-select
                    label="Type"
                    v-model="type"
                    :items="options"
                ></v-select>
            </v-form>
            <v-row justify="end">
                <v-col cols="4">
                    <v-btn flat block variant="tonal" color="primary" class="text-right" @click="createHandler()">Create</v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-card>
</template>

<script lang="ts">
import { ChannelCreate } from "@/domain/entity/channel/channelCreate"
import { ChannelList } from "@/domain/entity/channel/channeList"
import { FetchChannel } from '@/domain/usecase/fetchChannel';
import { useUserStore } from '@/store/user/user';
import ApiClient from '@/infra/api/apiClient';

import { useChannelListStore } from '@/store/channel/channelList';

export default {
    data() {
        return {
            name: "",
            explanation: "",
            type: "",
            options: ["text", "voice"],
            userStore: useUserStore(),
            channelListStore: useChannelListStore(),
        };
    },
    methods: {
        async createHandler() {
            const body: { name: string, explanation: string, type: string } = {
                name: this.name,
                explanation: this.explanation,
                type: this.type,
            }

            const userKey: string = this.userStore.user.items.user_key
            const route = useRoute()
            const roomKey: string = route.params.roomKey;

            // チャンネル登録
            const fetchChannel: ChannelCreate = new FetchChannel(ApiClient);
            await fetchChannel.createChannel(body, userKey, roomKey);

            // チャンネル一覧を取得
            const channelList: ChannelList = await fetchChannel.listChannel(userKey, roomKey);
            this.channelListStore.update(channelList);

            this.$router.push('/');
        },
    },
};
</script>

<style lang="scss" scoped>
.base_card {
    background: #ffffff;
}
</style>
