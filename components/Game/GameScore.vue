<template>
    <v-row v-if="gameList" class="cards-row" align="stretch">
        <v-col cols="12" sm="4">
            <v-card class="game_card" flat :style="{ height: gameImageHeight + 'px' }">
                <img class="game_image" :alt="game.gameTitle" :src="game.gameImagePath" @load="adjustCardHeight">
            </v-card>
        </v-col>
        <v-col cols="12" sm="8">
            <v-card class="chart_card" :style="{ height: gameImageHeight + 'px' }" flat>
            <Swiper
                :slidesPerView="3"
                :loop="true"
                :speed="3000"
                :autoplay="{ delay: 2000 }"
                :modules="[SwiperAutoplay, SwiperEffectCreative]"
            >
                <SwiperSlide v-for="item in items">
                    <v-card flat style="margin: 0px 0px 0px 0px;">
                        <v-card-item>
                            <v-card-title class="headline">{{ item.title }}</v-card-title>
                            <div style="height: 100px;">
                                {{ item.content }}
                            </div>
                        </v-card-item>
                    </v-card>
                </SwiperSlide>
            </Swiper>    
        </v-card>
        </v-col>
        <v-col cols="12" sm="6">
            <v-card class="chart_card" :style="{ height: gameImageHeight + 'px' }" flat>
                <div class="chart_container">
                    <ScoreChart />
                </div>
            </v-card>
        </v-col>
        <v-col cols="12" sm="6">
            <v-card class="chart_card" :style="{ height: gameImageHeight + 'px' }" flat>
                <div class="chart_container">
                    <ScoreComboChart />
                </div>
            </v-card>
        </v-col>
        <v-col cols="12" sm="6">
            <v-card class="chart_card" :style="{ height: gameImageHeight + 'px' }" flat>
                <div class="chart_container">
                    <PlayTimeChart />
                </div>
            </v-card>
        </v-col>
        <v-col cols="12" sm="6">
            <v-card class="chart_card" :style="{ height: gameImageHeight + 'px' }" flat>
                <div class="chart_container">
                    <RankChart />
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { useUserStore } from '@/store/user/user';
import { useListGameScoreStore } from '@/store/game/listGameScore';
import { FetchGame } from '@/domain/usecase/fetchGame';
import ApiClient from '@/infra/api/apiClient';

import ScoreChart from '@/components/Game/Chart/Score/ScoreChart'
import ScoreComboChart from '@/components/Game/Chart/ComboScore/ComboScoreChart'
import PlayTimeChart from '@/components/Game/Chart/PlayTime/PlayTimeChart'
import RankChart from '@/components/Game/Chart/Rank/RankChart'

export default {
    name: 'App',
    components: {
        ScoreChart,
        ScoreComboChart,
        PlayTimeChart,
        RankChart
    },
    data() {
        return {
            items: [
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
                },
                {
                    title: 'title6',
                    path: '/item6',
                    content: 'content6'
                },    
                {
                    title: 'title7',
                    path: '/item7',
                    content: 'content7'
                }
            ],
            gameImageHeight: 0,
            game: {
                gameKey:       "",
                gameTitle:     "",
                gameImagePath: "",
            },
            userStore: useUserStore(),
            useListGameScoreStore: useListGameScoreStore(),
            gameList: false,
        };
    },
    mounted() {
        this.getGameScoreList();
    },
    methods: {
        adjustCardHeight(event) {
        const imageHeight = event.target.height; // 読み込まれた画像の高さ
        this.gameImageHeight = imageHeight; // データプロパティを更新
        console.log(this.gameImageHeight)
    },
        updateUserImage() {
            const config = useRuntimeConfig();
            const userKey = this.userStore.user.items.user_key
            var userImage = `${config.public.GcImageUrl}/image/get?image_path=static/images/user/noimage_icon.png`
            if (userKey != "") {
                userImage = `${config.public.GcImageUrl}/image/get?image_path=static/images/user/${userKey}.png`
            }

            return userImage
        },
        async getGameScoreList() {
            const route = useRoute();
            const gameKey: string = route.params.gameKey;
            const userKey = this.userStore.user.items.user_key;
            
            const fetchGame = new FetchGame(ApiClient);
            const listGameScore = await fetchGame.listGameScore(userKey, gameKey);

            const config = useRuntimeConfig();
            this.game = {
                gameKey:       listGameScore.items.game_key,
                gameTitle:     listGameScore.items.game_title,
                gameImagePath: `${config.public.GcImageUrl}/image/get?image_path=static/images${listGameScore.items.game_image_path}`,
            }

            try {
                this.useListGameScoreStore.update(listGameScore);
                this.gameList =true;
            } catch (error) {
                this.gameList =true;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.user_info {
    display: flex;
    align-items: center;
}

.user_icon {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    position: relative;
    object-fit: cover;
}

.user_name {
    font-weight: bold;
    margin: 10px;
}

.game_card {
    height: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
}

.chart_card {
    height: 100%;
    display: flex;
    align-items: stretch;
}

.chart_container {
  flex: 1;
}

.game_title {
    color: rgb(163, 163, 163);
}

.game_image {
    width: 100%;
    flex-grow: 1;
    object-fit: cover;
}
</style>
