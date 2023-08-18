<template>
    <v-col cols="12">
        <v-card class="base_card" flat>
            <v-col cols="12">
                <h2>New Room</h2>
                <v-form>
                    <v-text-field label="Name" v-model="name"></v-text-field>
                    <v-textarea label="Description" v-model="description" rows="5"></v-textarea>
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
                        <v-btn flat block variant="tonal" color="primary" class="text-right" @click="createHandler()">Create</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-card>
    </v-col>
</template>

<script lang="ts">
import { FetchRoom } from '@/domain/usecase/fetchRoom';
import { FetchGenre } from '@/domain/usecase/fetchGenre';
import { useUserStore } from '@/store/user/user';
import { useListRoomStore } from '@/store/room/listRoom';
import ApiClient from '@/infra/api/apiClient';

export default {
    data() {
        return {
            userStore:     useUserStore(),
            name:          "",
            description:   "",
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
            const body = {
                name:        this.name,
                description: this.description,
                status:      this.status,
                genre:       this.genre,
                game:        this.game,
            };

            // ルーム登録
            const fetchRoom = new FetchRoom(ApiClient);
            await fetchRoom.createRoom(body, this.userStore.user.items.user_key);

            // ルーム一覧を取得
            const roomList = await fetchRoom.listRoom(this.userStore.user.items.user_key);
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
