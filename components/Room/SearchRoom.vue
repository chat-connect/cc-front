<template>
    <v-card class="base_card" flat>
        <v-col cols="12">
            <h2>Search Room</h2>
            <v-form>
                <v-text-field label="Room Key" v-model="roomKey"></v-text-field>
                <v-select
                    label="Type"
                    v-model="status"
                    :items="statusOptions"
                ></v-select>
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
                        <v-btn flat block variant="tonal" color="primary" class="text-right send_button" @click="createHandler()">Join</v-btn> 
                </v-col>
            </v-row>
        </v-col>
    </v-card>
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
            roomKey: "",               
            userStore: useUserStore(),
            status:        "",
            genre:         "",
            game:          "",
            statusOptions: ["public", "private"],
            genreOptions:  [],
            gameOptions:   [],
        };
    },
    mounted() {
        this.getGenreAndGameList();
    },
    methods: {
        async getGenreAndGameList() {
            const fetchGenre = new FetchGenre(ApiClient);
            const listGenreAndGame =  await fetchGenre.listGenreAndGame();

            for (const genre of listGenreAndGame.items.list_genre) {
                const data = {
                    title:  genre.name,
                    value: genre.genre_key
                };
                this.genreOptions.push(data);
            }

            for (const game of listGenreAndGame.items.list_game) {
                const data = {
                    title:  game.name,
                    value: game.game_key
                };
                this.gameOptions.push(data);
            }
        },
        async createHandler() {
            const userkey : string = this.userStore.user.items.user_key
            const roomKey: string = this.roomKey

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
