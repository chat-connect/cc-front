<template>
    <v-container>
        <v-card class="base_card" flat>
            <v-col cols="12">
                <h2>New Room</h2>
                <v-form>
                    <v-text-field label="Name" v-model="name"></v-text-field>
                    <v-textarea label="Explanation" v-model="explanation" rows="5"></v-textarea>
                </v-form>
                <v-row justify="end">
                    <v-col cols="4">
                        <v-btn flat block variant="tonal" color="primary" class="text-right" @click="createHandler()">Create</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { FetchRoom } from '@/domain/usecase/fetchRoom';
import { useUserStore } from '@/store/user/user';
import { useRoomListStore } from '@/store/room/roomList';
import ApiClient from '@/infra/api/apiClient';

export default {
    data() {
        return {
            name: '',
            explanation: '',                
            userStore: useUserStore(),
        };
    },
    methods: {
        async createHandler() {
            const body = {
                name: this.name,
                explanation: this.explanation,
            }
            
            // ルーム登録
            const fetchRoom = new FetchRoom(ApiClient);
            const newRoom = await fetchRoom.roomCreate(body, this.userStore.user.items.user_key);

            // ルーム一覧を取得
            const roomList = await fetchRoom.roomList(this.userStore.user.items.user_key);
            const roomListStore = useRoomListStore();
            roomListStore.update(roomList);

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
