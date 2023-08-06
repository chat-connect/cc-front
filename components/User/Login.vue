<template>
    <v-container>
        <v-card class="base_card" flat>
            <v-col cols="12">
                <h2>Login</h2>
                <v-form>
                    <v-text-field label="email" v-model="email"></v-text-field>
                    <v-text-field type="password" label="password" v-model="password"></v-text-field>
                </v-form>
                <v-row>
                    <v-col cols="8">
                        <v-btn flat block variant="tonal" color="#00E5FF" @click="loginHandler">Login</v-btn>
                    </v-col>
                    <v-col cols="4">
                        <v-btn flat block variant="outlined" color="#00E5FF" to="/register">Register</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { ref } from 'vue';
import { FetchUser } from '@/domain/usecase/fetchUser';
import { FetchRoom } from '@/domain/usecase/fetchRoom';
import { User } from '@/domain/entity/user';
import { RoomList } from "@/domain/entity/room/roomList"
import { useUserStore } from '@/store/user';
import { useRoomListStore } from '@/store/room/roomList';
import ApiClient from '@/infra/api/apiClient';

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async loginHandler() {
            const request = {
                email: this.email,
                password: this.password,
            };

            // ログイン
            const fetchUser = new FetchUser(ApiClient);
            const user = ref<User | null>(null);
            user.value = await fetchUser.login(request);
            const accessTokenCookie = useCookie('access_token');
            accessTokenCookie.value = user.value.items.token;
            await accessTokenCookie;
            const userStore = useUserStore();
            userStore.update(user.value);

            // ルーム一覧を取得
            const fetchRoom = new FetchRoom(ApiClient);
            const roomList = ref<RoomList | null>(null);
            roomList.value = await fetchRoom.roomList( user.value.items.user_key);
            const roomListStore = useRoomListStore();
            roomListStore.update(roomList.value);

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
