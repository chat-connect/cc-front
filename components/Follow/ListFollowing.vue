<template>
    <v-card flat align-content="center">
        <v-container>
            <v-row>
                <v-col cols="12" v-for="item in followerItems" :key="item.id">
                    <div class="user_info">
                        <img class="user_icon" :src="item.userImagePath" alt="UserIcon">
                        <div class="user_name">{{ item.name }}</div>
                        <v-row v-if="item.mutual" class="justify-end">
                            <v-btn class="follow_status" rounded flat style="text-transform: none" color="grey-darken-1" variant="tonal">followed</v-btn>
                            <v-btn class="follow_status" rounded flat style="text-transform: none" color="primary" variant="tonal">following</v-btn>
                        </v-row>
                        <v-row v-else class="justify-end">
                            <v-btn class="follow_status" rounded flat style="text-transform: none" color="primary" variant="tonal">following</v-btn>
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
import { FetchFollow } from '@/domain/usecase/fetchFollow';
import ApiClient from '@/infra/api/apiClient';

export default {
    data() {
        return {
            followerItems: [],
            userStore: useUserStore(),
        };
    },
    mounted() {
        this.listFollowing();
    },
    methods: {
        async listFollowing() {
            const userKey = this.userStore.user.items.user_key;
            const fetchFollow = new FetchFollow(ApiClient);
            const listFollowing = await fetchFollow.listFollowing(userKey);

            const config = useRuntimeConfig();
            for (const following of listFollowing.items.list) {
                var mutual: string = ""; 
                if (following.mutual) {
                    mutual = "followed";
                } else {
                    mutual = "";
                }

                const data = {
                    userKey:       following.status.user_key,
                    name:          following.status.name,
                    userImagePath: `${config.public.GcImageUrl}/image/get?image_path=static/images${following.status.image_path}`,
                    mutual:         mutual,
                };
                this.followerItems.push(data);
            }
        },
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
