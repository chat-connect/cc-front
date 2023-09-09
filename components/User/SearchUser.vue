<template>
    <v-row>
        <v-col cols="12">
            <v-card class="base_card" flat>
                <v-col cols="12">
                    <h2>Search User</h2>
                    <v-form>
                        <v-text-field label="Name" v-model="name"></v-text-field>
                    </v-form>
                    <v-row justify="end">
                        <v-col cols="4">
                                <v-btn flat block variant="tonal" color="primary" class="text-right send_button" @click="searchHandler()">Search</v-btn> 
                        </v-col>
                    </v-row>
                </v-col>
            </v-card>
        </v-col>            
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-card flat align-content="center">
                <v-col cols="12" v-for="item in userItems" :key="item.id">
                    <div class="user_info">
                        <img class="user_icon" :src="item.imagePath" alt="UserIcon">
                        <div class="user_name">{{ item.name }}</div>
                        <v-row v-if="item.following" class="justify-end">
                            <v-btn class="follow_status" rounded flat style="text-transform: none" color="primary" variant="tonal">following</v-btn>
                        </v-row>
                        <v-row v-else class="justify-end">
                            <v-btn class="follow_status" rounded flat style="text-transform: none" color="grey-darken-1" variant="tonal" @click="createFollow(item.userKey)">to follow</v-btn>
                        </v-row>
                    </div>
                    <div class="content_separator"></div>
                </v-col>
            </v-card>               
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { FetchUser } from '@/domain/usecase/fetchUser';
import { FetchFollow } from '@/domain/usecase/fetchFollow';
import { useUserStore } from '@/store/user/user';
import ApiClient from '@/infra/api/apiClient';

export default {
    data() {
        return {
            name: "",
            roomKey: "",               
            userStore: useUserStore(),
            userItems: [],
        };
    },
    methods: {
        async searchHandler() {
            const userkey : string = this.userStore.user.items.user_key
            
            // ルーム一覧を取得
            const fetchUser = new FetchUser(ApiClient);
            const userList = await fetchUser.searchUser(userkey, this.name);

            console.log(userList)
            const config = useRuntimeConfig();

            this.userItems = []
            for (const user of userList.items.list) {
                const data = {
                    userKey:   user.user_key,
                    name:      user.name,
                    imagePath: `${config.public.GcImageUrl}/image/get?image_path=static/images${user.image_path}`,
                    following: user.following,
                };

                this.userItems.push(data);
            }
        },
        async createFollow(followingUserKey: string) {
            const body = {
                following_user_key: followingUserKey,
            }

            const userKey = this.userStore.user.items.user_key;
            const fetchFollow = new FetchFollow(ApiClient);
            await fetchFollow.createFollow(body, userKey);

            for (let i = 0; i < this.userItems.length; i++) {
                if (this.userItems[i].userKey === followingUserKey) {
                    this.userItems[i].following = true;
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.base_card {
    background: #ffffff;
}

.follow_status {
    margin: 5px;
}

.content_separator {
    width: 100%;
    height: 1px;
    background-color: #ccc;
    margin: 10px 0;
}

.user_mutual {
    color: #7a7a7a;
    background-color: #faf9f9;
    padding: 5px;
}

.user_info {
    display: flex;
    align-items: center;
}

.user_icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: relative;
    object-fit: cover;
}

.user_name {
    font-weight: bold;
    margin: 10px;
}
</style>