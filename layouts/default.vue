<template>
    <v-app class="main">
        <v-navigation-drawer v-model="drawer" class="px-6 py-4 scrollbar navbar">
            <div app style="display: flex; align-items: center;">
                <img class="image_circle user_icon" src="~/assets/images/sample_icon.png" @click="drawer = !drawer">
                <v-app-bar-title class="font-weight-bold sidevar_name">{{ userStore.user.items.name }}</v-app-bar-title>
            </div>
            <div style="display: flex; align-items: center;">
                <v-list-subheader>{{ 100 }}Following</v-list-subheader>
                <v-list-subheader>{{ 125 }}Followers</v-list-subheader>
            </div>
            <v-list>
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :value="item"
                    color="primary"
                    rounded="xl"
                    :to="item.to"
                >
                    <template v-slot:prepend>
                        <v-icon :icon="item.icon"></v-icon>
                    </template>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item>
                <v-list-group
                    color="primary"
                    value="Room"
                >
                    <template v-slot:activator="{ props }">
                        <v-list-item
                        v-bind="props"
                        title="Room"
                        rounded="xl"
                        prepend-icon="mdi-comment-text-outline"
                        ></v-list-item>
                    </template>
                    <v-list-item
                        v-for="(room, i) in rooms"
                        :key="i"
                        :title="room.title"
                        :prepend-icon="room.icon"
                        :value="room.title"
                        color="primary"
                        rounded="xl"
                        :to="room.to"
                    ></v-list-item>
                    <v-list-item
                        title="New"
                        prepend-icon="mdi-plus-box"
                        value="New"
                        color="primary"
                        rounded="xl"
                        to="/room/create"
                    ></v-list-item>
                </v-list-group>
                <v-list-item
                    v-if="checkUser()"
                    to="/login"
                    class="py-3"
                    color="primary"
                    rounded="xl"
                >
                    <template v-slot:prepend>
                        <v-icon>mdi-login</v-icon>
                    </template>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
                <v-list-item
                    v-else @click="logoutHandler()"
                    class="py-3"
                    color="primary"
                    rounded="xl"
                >
                <template v-slot:prepend>
                        <v-icon>mdi-login</v-icon>
                    </template>
                    <v-list-item-title>Login</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app flat border class="px-md-6">
            <v-btn icon @click.stop="drawer = !drawer">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
            <div class="center_icon">
                <v-btn icon class="center_icon_size">
                    <v-icon>mdi-vuejs</v-icon>
                </v-btn>
            </div>
            <div></div> <!-- Flexbox の中央寄せを行うためのダミー要素 -->
        </v-app-bar>
        <v-main>
            <slot /> 
        </v-main>
    </v-app>
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
            drawer: true,
            items: [
                { title: 'Profile', icon: 'mdi-account', to: '' },
                { title: 'Message', icon: 'mdi-email-outline', to: '' },
                { title: 'Times', icon: 'mdi-clock', to: '/' },
            ],
            rooms: [
                { title: 'Room1', icon: 'mdi-account-group', to: '/room/GUGYBGH+BRsth/room' },
                { title: 'Room2', icon: 'mdi-account-group', to: '/room/GUGYBfeggRsth/room' },
            ],
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
            checkUser,
            logoutHandler,
        };
    },
};
</script>

<style lang="scss" scoped>
.main {
    background: #eeebeb;
}

.center_icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.center_icon_size {
  font-size: 25px;
}

img.user_icon {
    width: 55px;
    height: 55px;
    object-fit: cover;
    border-radius: 50%;
    position: relative;
    left: 5px;
}

v-list-item.login {
    background: #ffffff;
}

.sidevar_name {
    position: relative;
    left: 10px;
}

.scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar ::-webkit-scrollbar {
    display: none;
}

.navbar {
    box-shadow: none !important;
}
</style>
