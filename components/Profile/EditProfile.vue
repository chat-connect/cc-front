<template>
    <v-card class="base_card" flat>
        <v-col cols="12">
            <h2>Edit User</h2>
            <v-form>
                <v-text-field label="email" v-model="email"></v-text-field>
                <v-text-field label="username" v-model="name"></v-text-field>
                <v-text-field label="description" v-model="description"></v-text-field>
                <v-file-input label="Upload Profile Picture" v-model="userImage"></v-file-input>
            </v-form>
            <v-row justify="end">
                <v-col cols="4">
                    <v-btn flat block variant="outlined" color="primary"  @click="updateHandler">Edit</v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-card>
</template>

<script lang="ts">
import { ref } from 'vue';
import { FetchUser } from '@/domain/usecase/fetchUser';
import { User } from '@/domain/entity/user/user';
import ApiClient from '@/infra/api/apiClient';
import { useUserStore } from '@/store/user/user';

export default {
    data() {
        return {
            email: '',
            name: '',
            description: '',
            userImage: null as File | null,
            userStore: useUserStore(),
        };
    },
    mounted() {
        const userData = this.userStore.user.items;

        this.email = userData.email;
        this.name = userData.name;
        this.description = userData.description;
    },
    methods: {
        async encodeImage(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file[0]);
            });
        },
        async updateHandler() {
            var userImage = null
            if (!this.userImage == null) {
                const encodeImage = await this.encodeImage(this.userImage);
                userImage = encodeImage.replace(/^data:image\/\w+;base64,/, '');
            }

            const userKey = this.userStore.user.items.user_key
            const request = {
                name:        this.name,
                email:       this.email,
                description: this.description,
                user_image:  userImage,
            };

            const fetchUser = new FetchUser(ApiClient);
            const user = await fetchUser.updateUser(userKey, request);

            this.userStore.update(user);
            this.$router.push('/profile/main');
        },
    },
};
</script>

<style lang="scss" scoped>
.base_card {
    background: #ffffff;
}
</style>
