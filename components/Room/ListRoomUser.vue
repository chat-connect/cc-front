<template>
    <v-card flat align-content="center">
        <v-container>
            <v-row>
                <v-col cols="12" v-for="item in userItems" :key="item.id">
                    <div class="user_info">
                        <img class="user_icon" :src="item.userImagePath" alt="UserIcon">
                        <div class="user_name">{{ item.name }}</div>
                        <v-row v-if="item.myAccount" class="justify-end">
                            <v-btn class="follow_status" rounded flat style="text-transform: none" color="pink-accent-3" variant="tonal">my account</v-btn>
                        </v-row>
                        <v-row v-else-if="item.follow" class="justify-end">
                            <v-btn class="follow_status" rounded flat style="text-transform: none" color="primary" variant="tonal">{{ item.follow ? 'following' : 'to follow' }}</v-btn>
                        </v-row>
                        <v-row v-else class="justify-end">
                            <v-btn class="follow_status" rounded flat style="text-transform: none" color="grey-darken-1" variant="tonal"  @click="createFollow(item.userKey)">{{ item.follow ? 'following' : 'to follow' }}</v-btn>
                        </v-row>
                    </div>
                    <div class="content_separator"></div>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script lang="ts">
import { useUserStore } from '@/store/user/user';
import { FetchRoom } from '@/domain/usecase/fetchRoom';
import { FetchFollow } from '@/domain/usecase/fetchFollow';
import ApiClient from '@/infra/api/apiClient';

export default {
    data() {
        return {
            userItems: [],
            userStore: useUserStore(),
        };
    },
    mounted() {
        this.listFollowers();
    },
    methods: {
        async listFollowers() {
            const userKey = this.userStore.user.items.user_key;
            const route = useRoute();
            const roomKey = route.params.roomKey;
            const fetchRoom = new FetchRoom(ApiClient);
            const roomUsers = await fetchRoom.listRoomUser(userKey, roomKey);

            const config = useRuntimeConfig();
            for (const user of roomUsers.items.list) {
                var follow = false;
                if (user.following_user_key != "") {
                    follow = true;
                }

                var myAccount = false;
                if (user.status.user_key == userKey) {
                    myAccount = true;
                }

                const data = {
                    userKey:       user.status.user_key,
                    name:          user.status.name,
                    userImagePath: `${config.public.GcImageUrl}/image/get?image_path=static/images${user.status.image_path}`,
                    follow:         follow,
                    myAccount:      myAccount,
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
                this.userItems[i].follow = true;
                }
            }
        }
    },
};
</script>

<style lang="scss" scoped>
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
