<template>
    <v-container>
        <v-card class="base_card" flat>
            <v-col cols="12">
                <h2>Register</h2>
                <v-form>
                    <v-text-field
                        label="email"
                        v-model="email"
                    ></v-text-field>
                    <v-text-field
                        label="username"
                        v-model="name"
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
                            @click="registerHandler"
                        >
                            Register
                        </v-btn>
                    </v-col>
                    <v-col cols="4">
                        <v-btn
                            flat
                            block
                            variant="outlined"
                            color="#00E5FF"
                            to="/login"
                        >
                            Login
                        </v-btn>                          
                    </v-col>
                </v-row>
            </v-col>
        </v-card>                
    </v-container>
</template>

<script setup lang="ts">
import { FetchUser } from "@/domain/usecase/FetchUser"
import { User } from "@/domain/entity/user"
import ApiClient from "@/infrastructure/api/ApiClient"

// body
const email = ref("")
const name = ref("")
const password = ref("")

const registerHandler = async () => {
    const request = {
        name:  name.value,
        email: email.value,
        password: password.value,
    }

    const fetchUser = new FetchUser(ApiClient)
    const user = ref<User | null>(null)
    user.value = await fetchUser.register(request)

    useRouter().push('/login')
}
</script>

<style lang="scss" scoped>
.base_card {
    background: #ffffff;
}
</style>
