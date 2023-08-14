<template>
    <v-card class="base_card" flat>
        <v-col cols="12">
            <h2>New Channel</h2>
            <v-form>
                <v-text-field label="Name" v-model="name"></v-text-field>
                <v-textarea label="Description" v-model="description" rows="5"></v-textarea>
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
import { CreateChannel } from "@/domain/entity/channel/createChannel"
import { ListChannel } from "@/domain/entity/channel/listChannel"
import { FetchChannel } from '@/domain/usecase/fetchChannel';
import { useUserStore } from '@/store/user/user';
import ApiClient from '@/infra/api/apiClient';

import { useListChannelStore } from '@/store/channel/listChannel';

export default {
    data() {
        return {
            name: "",
            description: "",
            type: "",
            options: ["text", "voice"],
            userStore: useUserStore(),
            listChannelStore: useListChannelStore(),
        };
    },
    methods: {
        async createHandler() {
            const body: { name: string, description: string, type: string } = {
                name: this.name,
                description: this.description,
                type: this.type,
            }

            const route = useRoute()
            const roomKey: string = route.params.roomKey;
            const userKey: string = this.userStore.user.items.user_key

            // チャンネル登録
            const fetchChannel: CreateChannel = new FetchChannel(ApiClient);
            await fetchChannel.createChannel(body, userKey, roomKey);

            // チャンネル一覧を取得
            const channelList: ListChannel = await fetchChannel.listChannel(userKey, roomKey);
            this.listChannelStore.update(channelList);

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
