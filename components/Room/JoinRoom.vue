<template>
    <v-row>
        <v-col cols="12">
            <v-card class="base_card" flat>
                <v-container>
                    <h2>Join Room</h2>
                    <v-row>
                        <v-col cols="9">
                            <v-form>
                                <v-text-field label="Room Key" v-model="roomKey"></v-text-field>
                            </v-form>
                        </v-col>
                        <v-col cols="3">
                            <v-btn flat block variant="tonal" color="primary" class="text-right send_button" @click="createHandler()">Join</v-btn>
                        </v-col>
                    </v-row>            
                </v-container>
            </v-card>        
        </v-col>            
    </v-row>
</template>

<script lang="ts">
import { FetchRoom } from '@/domain/usecase/fetchRoom';
import { useUserStore } from '@/store/user/user';
import { useListRoomStore } from '@/store/room/listRoom';
import ApiClient from '@/infra/api/apiClient';

export default {
    data() {
        return {
            roomKey: "",               
            userStore: useUserStore(),
        };
    },
    methods: {
        async createHandler() {
            const userkey : string = this.userStore.user.items.user_key
            const roomKey: string = this.roomKey

            // ルーム参加
            const fetchRoom = new FetchRoom(ApiClient);
            await fetchRoom.joinRoom(userkey, roomKey);
            
            // ルーム一覧を取得
            const roomList = await fetchRoom.listRoom(userkey);
            const listRoomStore = useListRoomStore();
            listRoomStore.update(roomList);

            this.$router.push('/');
        },
    },
};
</script>

<style lang="scss" scoped>
.base_card {
    background: #ffffff;
}

.send_button {
    align-self: flex-start;
    height: 56px;
}
</style>
