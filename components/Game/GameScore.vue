<template>
    <v-row>   
        <v-col cols="12" sm="8">
            <v-card flat align-content="center">
                <v-container>
                    <v-row>
                        <v-col cols="12" align-content="center">
                            <div class="user_info">
                                <img class="user_icon" :src="updateUserImage()" alt="UserIcon">
                                <h2 class="user_name">{{ userStore.user.items.name }}</h2>
                            </div>
                        </v-col>
                        <v-col cols="12" align-content="center">
                            <div class="user_info">
                                <h3 class="user_name">link</h3>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>        
        </v-col>     
        <v-col cols="12" sm="4">
            <v-card class="game_card" flat>
                <img class="game_image" :alt="game.gameTitle" :src="game.gameImagePath">
            </v-card>
        </v-col>      
    </v-row>
</template>

<script lang="ts">
import { useUserStore } from '@/store/user/user';
import { FetchGame } from '@/domain/usecase/fetchGame';
import ApiClient from '@/infra/api/apiClient';

export default {
    data() {
        return {
            game: {
                gameKey:       "",
                gameTitle:     "",
                gameImagePath: "",
            },
            gameSettng: {},
            gameScoreItems: [],
            userStore: useUserStore(),
        };
    },
    mounted() {
        this.getGameScoreList();
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
        async getGameScoreList() {
            const route = useRoute();
            const gameKey: string = route.params.gameKey;
            const userKey = this.userStore.user.items.user_key
            
            const fetchGame = new FetchGame(ApiClient);
            const listGameScore = await fetchGame.listGameScore(userKey, gameKey);

            const config = useRuntimeConfig();
            this.game = {
                gameKey:       listGameScore.items.game_key,
                gameTitle:     listGameScore.items.game_title,
                gameImagePath: `${config.public.GcImageUrl}/image/get?image_path=static/images${listGameScore.items.game_image_path}`,
            }

            this.GameSetting = listGameScore.items.setting
            this.GameeScoreItems = listGameScore.items.list
        }
    },
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
}

.game_title {
    color: rgb(163, 163, 163);
}
.game_image {
    width: 100%;
    height: 100%;
}
</style>
