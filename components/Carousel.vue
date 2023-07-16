<template>
    <div>
        <Swiper
            :slidesPerView="1"
            :loop="true"
            :speed="3000"
            :autoplay="{ delay: 2000 }"
            :modules="[SwiperAutoplay, SwiperEffectCreative]"
        >
            <SwiperSlide v-for="item in items">
                <v-card flat style="margin: 0px 10px 0px 10px;">
                    <v-card-item>
                        <v-card-title class="headline">{{ item.title }}</v-card-title>
                        <div style="height: 100px;">
                            {{ item.content }}
                        </div>
                    </v-card-item>
                </v-card>
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<script setup lang="ts">
const items = [
    {
        title: 'title1',
        path: '/item1',
        content: 'content1'
    },
    {
        title: 'title2',
        path: '/item2',
        content: 'content2'
    },
    {
        title: 'title3',
        path: '/item3',
        content: 'content3'
    },
    {
        title: 'title4',
        path: '/item4',
        content: 'content4'
    },    
    {
        title: 'title5',
        path: '/item5',
        content: 'content5'
    }]
</script>
