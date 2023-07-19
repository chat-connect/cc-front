import { ref } from "vue"
import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            user: {
                userKey:  ref(""),
                username: ref(""),
                email:    ref(""),
            },
        }
    },
    persist: true,
    getters: {
        double: (state) => {
            return state.user
        },
    },
    actions: {
        increment(user) {
            this.user = {
                userKey:  user.user_key,
                username: user.username,
                email:    user.email,
            }
        },
    },
})
