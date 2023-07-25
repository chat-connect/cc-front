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
import { useUserStore } from "~/store/user";

const email = ref("")
const password = ref("")

const loginHandler = async () => {
    const config = useRuntimeConfig()
    const url: string = config.public.CcFrontUrl + "/api/login"
    const result = await $fetch(url, {
        method: "POST",
        body: {
            email: email.value,
            password: password.value,
        },
    })
    const accessTokenCookie = useCookie("access_token")
    accessTokenCookie.value = result.items.token

    // user情報
    const userStore = useUserStore();
    userStore.increment(result.items)

    const { login } = useAuth()
    const userLogin = await login(result.items)
}
</script>
