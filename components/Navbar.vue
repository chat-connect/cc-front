<template>
    <div>
        <v-app-bar
            app
            flat
            border
            class="px-md-6"
        >
            <img class="image_circle user_icon" src="~/assets/image/sample_icon.png" @click="drawer = !drawer">
            <v-app-bar-title class="font-weight-bold">
                {{ userStore.user.username }}
            </v-app-bar-title>
            <v-spacer />
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" class="px-6 py-4">
            <v-list class="item_list box">
                <v-list-item v-for="item in items" :to="item.path" class="py-3">
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
                <v-list-item v-else @click="logoutHandler" class="py-3">
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

<script setup lang="ts">
import { useUserStore } from "~/store/user";
import { ref } from "vue"

// user情報
const userStore = useUserStore();

const items = [
    {
        title: 'room1',
        path: '/item1',
        icon: 'mdi-ghost'
    },
    {
        title: 'room2',
        path: '/item2',
        icon: 'mdi-ghost'
    }]

const drawer = useState('drawer', () => false)

// logout
const logoutHandler = async () => {
    const access_token = useCookie('access_token')
    const config = useRuntimeConfig()
    const url: string = config.public.CcFrontUrl + "/api/logout"
    const result = await $fetch(url, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + access_token.value,
        },
        body: {
            userKey: userStore.user.userKey,
        },
    })

    result.items.userKey = ref("")
    result.items.username = ref("")
    result.items.email = ref("")
    userStore.increment(result)
    const { logout } = useAuth()
    const userLogout = await logout(result.items)
}

// user check
const checkUser = () => {
    let status: boolean = false
    if (userStore.user.username == "") {
        status = true
    }

    return status
}
</script>

<style>
img.user_icon {
	width: 55px;
	height: 55px;
	object-fit:cover;
	border-radius:50%;
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
}

.box::-webkit-scrollbar {
    display:none;
}
</style>