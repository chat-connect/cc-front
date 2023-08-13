<template>
    <v-card flat align-content="center" class="card_content">
        <v-container>
            <v-row>
                <v-col cols="12" align-content="center">
                    <div class="user_info">
                        <h2 class="user_name">Score Board</h2>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script lang="ts">
import { useUserStore } from '@/store/user/user';

export default {
    data() {
        return {
            items: [
                { title: 'title1', path: '/item1', content: 'content1' },
                { title: 'title2', path: '/item2', content: 'content2' },
                { title: 'title3', path: '/item3', content: 'content3' },
                { title: 'title4', path: '/item4', content: 'content4' },    
                { title: 'title5', path: '/item5', content: 'content5'}
            ],
            userStore: useUserStore(),
        };
    },
    methods: {
        updateUserImage() {
            const config = useRuntimeConfig();
            const userKey = this.userStore.user.items.user_key
            var userImage = `${config.public.GcImageUrl}/image/get?image_path=static/images/user/noimage_icon.png`
            if (userKey != "") {
                userImage = `${config.public.GcImageUrl}/image/get?image_path=static/images/user/${userKey}.png`
            }

            return userImage
        },
    },
};
</script>

<style lang="scss" scoped>
.user_info {
    display: flex;
    align-items: center;
}

.user_icon {
    width: 75px;
    height: 75px;
    border-radius: 50%;
}

.user_name {
    font-weight: bold;
}

.carousel-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 0px 0px 0px;
}

.carousel-slide-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.card_content {
    height: 50vh;
}
</style>
