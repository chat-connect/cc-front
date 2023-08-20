<template>
    <v-row>
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
                    </v-row>
                    <v-row justify="end">
                        <v-col cols="4">
                            <v-btn flat block variant="outlined" color="primary" to="/profile/edit">Edit</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>        
        </v-col>   
        <v-col cols="12" sm="4" v-for="item in gameItems">
            <v-card class="game_card" flat>
                <img class="game_image" :src="item.gameImagePath" alt="UserIcon">              
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
            gameItems: [],
            userStore: useUserStore(),
        };
    },
    mounted() {
        this.getGameList();
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
        async getGameList() {
            const userKey = this.userStore.user.items.user_key
            const fetchGame = new FetchGame(ApiClient);
            const listGameUser = await fetchGame.listGameUser(userKey);

            const config = useRuntimeConfig();
            for (const game of listGameUser.items.list) {
                const data = {
                    gameKey:       game.game_key,
                    gameTitle:     game.game_title,
                    gameImagePath: `${config.public.GcImageUrl}/image/get?image_path=static/images${game.game_image_path}`,
                };
                this.gameItems.push(data);
            }
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

.game_card {
    height: 96%;
}

.game_title {
    color: rgb(163, 163, 163);
}
.game_image {
    width: 100%;
    height: auto;
}
</style>
