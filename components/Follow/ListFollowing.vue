<template>
    <v-card flat align-content="center">
        <v-container>
            <v-row>
                <v-col cols="12">
                    {{ "following" }}
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

            console.log(listFollowing);
        },
    },
};
</script>
