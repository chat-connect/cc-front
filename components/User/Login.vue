<template>
    <v-container>
        <v-card class="base_card" flat>
            <v-col cols="12">
                <h2>Login</h2>
                <v-form>
                    <v-text-field
                        label="email"
                        v-model="email"
                    ></v-text-field>
                    <v-text-field
                        type="password"
                        label="password"
                        v-model="password"
                    ></v-text-field>
                </v-form>
                <v-row>
                    <v-col cols="8">
                        <v-btn
                            flat
                            block
                            variant="tonal"
                            color="#00E5FF"
                            @click="loginHandler"
                        >
                            Login
                        </v-btn>
                    </v-col>
                    <v-col cols="4">
                        <v-btn
                            flat
                            block
                            variant="outlined"
                            color="#00E5FF"
                            to="/register"
                        >
                            Register
                        </v-btn>                          
                    </v-col>
                </v-row>
            </v-col>
        </v-card>                
    </v-container>
</template>

<script setup lang="ts">
import { FetchUser } from "@/domain/usecase/fetchUser"
import { User } from "@/domain/entity/user"
import { useUserStore } from "~/store/user";
import ApiClient from "@/infra/api/apiClient"

// body
const email = ref("")
const password = ref("")

const loginHandler = async () => {
    const request = {
        email: email.value,
        password: password.value,
    }

    const fetchUser = new FetchUser(ApiClient)
    const user = ref<User | null>(null)
    user.value = await fetchUser.login(request)

    const accessTokenCookie = useCookie("access_token")
    accessTokenCookie.value = user.value.items.token

    const userStore = useUserStore();
    userStore.increment(user.value)

    useRouter().push('/')
}
</script>

<style lang="scss" scoped>
.base_card {
    background: #ffffff;
}
</style>
