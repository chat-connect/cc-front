<template>
    <v-row>
        <v-col cols="12">
            <v-card class="base_card" flat>
                <v-col cols="12">
                    <h2>Search Room</h2>
                    <v-form>
                        <v-text-field label="Name" v-model="name"></v-text-field>
                        <v-select
                            v-model="genre"
                            :items="genreOptions"
                            item-title="title"
                            item-value="value"
                            label="Genre"
                        ></v-select>
                        <v-select
                            v-model="game"
                            :items="gameOptions"
                            item-title="title"
                            item-value="value"
                            label="Game"
                        ></v-select>
                    </v-form>
                    <v-row justify="end">
                        <v-col cols="4">
                                <v-btn flat block variant="tonal" color="primary" class="text-right send_button" @click="searchHandler()">Search</v-btn> 
                        </v-col>
                    </v-row>
                </v-col>
            </v-card>
        </v-col>            
    </v-row>
    <v-row>
        <v-col cols="12" sm="4" v-for="(room, i) in searchList">
            <v-card class="base_card" flat>
                <v-card-title>
                    <h2>{{ room.name }}</h2>
                </v-card-title>
                <v-col>
                    <v-row>
                        <v-col cols="12">
                            <h4>Description: {{ room.description }}</h4>
                        </v-col>
                        <v-col cols="12">
                            <h4>Genre: {{ room.genre.name }}</h4>
                        </v-col>
                        <v-col cols="12">
                            <h4>Game: {{ room.game.game_title }}</h4>
                        </v-col>
                    </v-row>
                    <v-row justify="end">
                        <v-col cols="6">
                            <v-btn flat block variant="tonal" color="primary" class="text-right send_button" @click="joinHandler(room.room_key)">join</v-btn> 
                        </v-col>                    
                    </v-row>                    
                </v-col>
            </v-card>
        </v-col>        
    </v-row>
</template>

<script lang="ts">
import { FetchGenre } from '@/domain/usecase/fetchGenre';
import { FetchRoom } from '@/domain/usecase/fetchRoom';
import { useUserStore } from '@/store/user/user';
import { useListRoomStore } from '@/store/room/listRoom';
import ApiClient from '@/infra/api/apiClient';

export default {
    data() {
        return {
            name: "",
            roomKey: "",               
            userStore: useUserStore(),
            status:        "",
            genre:         "",
            game:          "",
            statusOptions: ["public", "private"],
            genreOptions:  [
                {
                    title: "All",
                    value: ""
                }
            ],
            gameOptions:   [
                {
                    title: "All",
                    value: ""
                }
            ],
            searchList: []
        };
    },
    mounted() {
        this.getGenreAndGameList();
    },
    methods: {
        // GenreとGameを取得する
        async getGenreAndGameList() {
            const fetchGenre = new FetchGenre(ApiClient);
            const listGenreAndGame = await fetchGenre.listGenreAndGame();

            for (const genre of listGenreAndGame.items.list_genre) {
                const data = {
                    title:  genre.name,
                    value: genre.genre_key
                };
                this.genreOptions.push(data);
            }

            for (const game of listGenreAndGame.items.list_game) {
                const data = {
                    title:  game.game_title,
                    value: game.game_key
                };
                this.gameOptions.push(data);
            }
        },
        async searchHandler() {
            const userkey : string = this.userStore.user.items.user_key
            
            // ルーム一覧を取得
            const fetchRoom = new FetchRoom(ApiClient);
            const searchList = await fetchRoom.searchRoom(userkey, this.name, this.genre, this.game);
            
            this.searchList = searchList.items.list
        },
        async joinHandler(roomKey: string) {
            const userkey : string = this.userStore.user.items.user_key

            // ルーム参加
            const fetchRoom = new FetchRoom(ApiClient);
            await fetchRoom.joinRoom(userkey, roomKey);
            
            // ルーム一覧を取得
            const roomList = await fetchRoom.listRoom(userkey);
            const listRoomStore = useListRoomStore();
            listRoomStore.update(roomList);

            this.$router.push('/');
        },
    },
};
</script>

<style lang="scss" scoped>
.base_card {
    background: #ffffff;
}
</style>
