<template>
    <v-container>
        <v-card style="background: #ffffff;" flat>
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
import { FetchUser } from "@/domain/usecase/FetchUser"
import { User } from "@/domain/entity/User"
import { useUserStore } from "~/store/User";
import ApiClient from "@/infrastructure/api/ApiClient"

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
    user.value = await fetchUser.userLogin(request)

    const accessTokenCookie = useCookie("access_token")
    accessTokenCookie.value = user.value.items.token

    const userStore = useUserStore();
    userStore.increment(user.value)

    useRouter().push('/')
}
</script>
