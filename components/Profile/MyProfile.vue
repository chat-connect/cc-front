<template>
    <v-col cols="12">
        <v-card flat align-content="center">
            <v-container>
                <v-row>
                    <v-col cols="12" align-content="center">
                        <div class="user_info">
                            <img class="user_icon" :src="updateUserImage()" alt="UserIcon">
                            <h2 class="user_name">{{ userStore.user.items.name }}</h2>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <v-list-subheader>{{ 100 }}Following</v-list-subheader>
                            <v-list-subheader>{{ 125 }}Followers</v-list-subheader>
                        </div>
                    </v-col>
                    <v-col cols="12" align-content="center">
                        <div class="user_info">
                            <h3 class="user_name">link</h3>
                        </div>
                    </v-col>
                    <v-col cols="12" align-content="center">
                        <div class="user_info">
                            <h3 class="user_name">Connect Games</h3>
                        </div>
                        <div>
                            <Swiper
                                :slidesPerView="1"
                                :loop="true"
                                :speed="3000"
                                :autoplay="{ delay: 2000 }"
                                :modules="[SwiperAutoplay, SwiperEffectCreative]"
                            >
                                <SwiperSlide v-for="item in items" :key="item.path">
                                    <v-card flat class="carousel-slide">
                                        <v-card-item class="carousel-slide-content">
                                            <v-card-title class="headline">{{ item.title }}</v-card-title>
                                            <div class="carousel-content">
                                                {{ item.content }}
                                            </div>
                                        </v-card-item>
                                    </v-card>
                                </SwiperSlide>
                            </Swiper>  
                        </div>
                    </v-col>
                </v-row>
                <v-row justify="end">
                    <v-col cols="4">
                        <v-btn flat block variant="outlined" color="primary" to="/profile/edit">Edit</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>        
    </v-col>
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

.carousel-content {
    height: 45vh;
}
</style>
