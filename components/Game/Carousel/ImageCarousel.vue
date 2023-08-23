<template>
    <Swiper
        :slidesPerView="1"
        :loop="true"
        :speed="3000"
        :autoplay="{ delay: 2000 }"
        :modules="[SwiperAutoplay, SwiperEffectCreative]"
    >
        <SwiperSlide v-for="image in images" :key="image.gameScoreImagePath">
            <img class="game_image" alt="No image" :src="image.gameScoreImagePath">
        </SwiperSlide>
    </Swiper>
</template>

<script lang="ts">
import { useListGameScoreStore } from '@/store/game/listGameScore';

export default {
    data() {
        return {
            images: [],
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            const config = useRuntimeConfig();
            const store = useListGameScoreStore();
            const gameScoreList = store.listGameScore.items.list;

            var gameScoreImage = []
            for (const game of gameScoreList) {
                const data = {
                    gameScoreImagePath: `${config.public.GcImageUrl}/image/get?image_path=static/images${game.game_score_image_path}`,
                }

                gameScoreImage.push(data);
            }

            
            this.images = gameScoreImage;
        }
    }
}
</script>

<style lang="scss" scoped>
.game_image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>