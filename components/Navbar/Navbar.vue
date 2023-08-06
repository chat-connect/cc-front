<template>
    <div>
        <v-app-bar app flat border class="px-md-6">
            <img class="image_circle user_icon" src="~/assets/images/sample_icon.png" @click="drawer = !drawer">
            <v-app-bar-title class="font-weight-bold">{{ userStore.user.items.name }}</v-app-bar-title>
            <v-spacer />
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" class="px-6 py-4">
            <v-list class="item_list box">
                <v-list-item v-for="item in roomListHandler()" :to="item.path" class="py-3" :key="item.title">
                    <v-row align="center">
                        <v-col cols="2">
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-col>
                        <v-col cols="10">
                            <v-list-item-title class="font-weight-bold">{{ item.title }}</v-list-item-title>
                        </v-col>
                    </v-row>
                </v-list-item>
            </v-list>
            <v-list>
                <v-list-item v-if="checkUser()" to="/login" class="py-3">
                    <v-row align="center">
                        <v-col cols="2">
                            <v-icon>mdi-login</v-icon>
                        </v-col>
                        <v-col cols="10">
                            <v-list-item-title class="font-weight-bold">Login</v-list-item-title>
                        </v-col>
                    </v-row>
                </v-list-item>
                <v-list-item v-else @click="logoutHandler()" class="py-3">
                    <v-row align="center">
                        <v-col cols="2">
                            <v-icon>mdi-login</v-icon>
                        </v-col>
                        <v-col cols="10">
                            <v-list-item-title class="font-weight-bold">logout</v-list-item-title>
                        </v-col>
                    </v-row>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { FetchUser } from '@/domain/usecase/fetchUser';
import { User } from '@/domain/entity/user/user';
import { useUserStore } from '@/store/user/user';
import { useRoomListStore } from '@/store/room/roomList';
import ApiClient from '@/infra/api/apiClient';

export default {
    data() {
        return {
            drawer: false,
        };
    },
    setup() {
        const userStore = useUserStore();
        const roomListStore = useRoomListStore();

        // ログインチェック
        const checkUser = () => {
            let status: boolean = false
            if (userStore.user.items.name == "") {
                status = true
            }
            return status
        };

        // ルーム一覧
        const roomListHandler = () => {
            const list = roomListStore.roomList.items.list
            const roomLists = [
                {
                    title: 'New!',
                    path: '/room/create',
                    icon: 'mdi-plus-box',
                }
            ]
            for (let i = 0; i < list.length; i++) {
                const item = {
                    title: list[i].name,
                    path: '/room/' + list[i].room_key,
                    icon: 'mdi-ghost',
                }
                roomLists.push(item);
            }

            return roomLists;
        }

        // ログアウト
        const logoutHandler = async () => {
            const userKey: string = userStore.user.items.user_key;

            const fetchUser = new FetchUser(ApiClient);
            const user = ref<User | null>(null);
            user.value = await fetchUser.logout(userKey);

            // storeを初期化
            userStore.delete();
            roomListStore.delete()

            useRouter().push('/login');
        };

        return {
            userStore,
            roomListHandler,
            checkUser,
            logoutHandler,
        };
    },
};
</script>

<style lang="scss" scoped>
img.user_icon {
    width: 55px;
    height: 55px;
    object-fit: cover;
    border-radius: 50%;
    position: relative;
    left: 5px;
}

v-list-item.login {
    background: #fff;
}

.item_list {
    height: 90%;
    overflow-y: auto;
}

.box {
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
}
</style>