<template>
    <v-row v-if="gameList" class="cards-row" align="stretch">
        <v-col cols="12" sm="4">
            <v-card align-content="center" :style="{ height: gameImageHeight + 'px' }" flat>
                <v-container>
                    <v-row>
                        <v-col cols="12" align-content="center">
                            <div class="user_info">
                                <img class="user_icon" :src="updateUserImage()" alt="UserIcon">
                                <h2 class="user_name">{{ userStore.user.items.name }}</h2>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <router-link to="/follow/following" class="router-link link">
                                    <v-list-subheader>{{ following }} Following</v-list-subheader>
                                </router-link>
                                <router-link to="/follow/followers" class="router-link link">
                                    <v-list-subheader class="link">{{ followers }} Followers</v-list-subheader>
                                </router-link>
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
        <v-col cols="12" sm="4">
            <v-card class="game_card" flat :style="{ height: gameImageHeight + 'px' }">
                <img class="game_image" :alt="game.gameTitle" :src="game.gameImagePath" @load="adjustCardHeight">
            </v-card>
        </v-col>
        <v-col cols="12" sm="4">
            <v-card class="chart_card" :style="{ height: gameImageHeight + 'px' }" flat>
                <ImageCarousel />
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
import { FetchFollow } from '@/domain/usecase/fetchFollow';
import ApiClient from '@/infra/api/apiClient';

import ScoreChart from '@/components/Game/Chart/Score/ScoreChart';
import ScoreComboChart from '@/components/Game/Chart/ComboScore/ComboScoreChart';
import PlayTimeChart from '@/components/Game/Chart/PlayTime/PlayTimeChart';
import RankChart from '@/components/Game/Chart/Rank/RankChart';
import ImageCarousel from '@/components/Game/Carousel/ImageCarousel';

export default {
    name: 'App',
    components: {
        ScoreChart,
        ScoreComboChart,
        PlayTimeChart,
        RankChart,
        ImageCarousel
    },
    data() {
        return {
            following: 0,
            followers: 0,
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
            const imageHeight = event.target.height;
            this.gameImageHeight = imageHeight;
        },
        updateUserImage() {
            const config = useRuntimeConfig();
            const userKey = this.userStore.user.items.user_key
            var userImage = `${config.public.GcImageUrl}/image/get?image_path=static/images/user/noimage_icon.png`
            if (userKey != "") {
                userImage = `${config.public.GcImageUrl}/image/get?image_path=static/images/user/${userKey}.png`
            }

            this.getFollowCount();

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
        },
        async getFollowCount() {
            const userKey = this.userStore.user.items.user_key
            if (userKey != "") {
                const fetchFollow = new FetchFollow(ApiClient);
                const countFollowingAndFollowers: CountFollowingAndFollowers = await fetchFollow.countFollowingAndFollowers(userKey);

                this.following = countFollowingAndFollowers.items.following_count;
                this.followers = countFollowingAndFollowers.items.followers_count;                
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
}

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
