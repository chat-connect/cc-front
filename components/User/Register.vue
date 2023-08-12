<template>
    <v-card class="base_card" flat>
        <v-col cols="12">
            <h2>Register</h2>
            <v-form>
                <v-text-field label="email" v-model="email"></v-text-field>
                <v-text-field label="username" v-model="name"></v-text-field>
                <v-text-field type="password" label="password" v-model="password"></v-text-field>
                <v-file-input label="Upload Profile Picture" v-model="userImage"></v-file-input>
            </v-form>
            <v-row>
                <v-col cols="8">
                    <v-btn flat block variant="tonal" color="primary" @click="registerHandler">Register</v-btn>
                </v-col>
                <v-col cols="4">
                    <v-btn flat block variant="outlined" color="primary" to="/login">Login</v-btn>
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

export default {
    data() {
        return {
            email: '',
            name: '',
            password: '',
            userImage: null as File | null,
        };
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
        async registerHandler() {
            const encodeImage = await this.encodeImage(this.userImage);
            const userImage = encodeImage.replace(/^data:image\/\w+;base64,/, '');
            const request = {
                name: this.name,
                email: this.email,
                password: this.password,
                user_image: userImage,
            };

            const fetchUser = new FetchUser(ApiClient);
            const user = ref<User | null>(null);
            user.value = await fetchUser.registerUser(request);

            this.$router.push('/login');
        },
    },
};
</script>

<style lang="scss" scoped>
.base_card {
    background: #ffffff;
}
</style>