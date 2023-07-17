<template>
    <v-container>
        <v-card style="background: #ffffff;" flat>
            <v-col cols="12">
                <h2>Register</h2>
                <v-form>
                    <v-text-field
                        label="email"
                        v-model="email"
                    ></v-text-field>
                    <v-text-field
                        label="username"
                        v-model="username"
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
const email = ref("")
const username = ref("")
const password = ref("")

const registerHandler = async () => {
    const config = useRuntimeConfig()
    const url: string = config.public.CcFrontUrl + "/api/register"
    const result = await $fetch(url, {
        method: "POST",
        body: {
            email: email.value,
            username: username.value,
            password: password.value,
        },
    })

    const { register } = useAuth()
    const userregister = await register(result)
}
</script>
