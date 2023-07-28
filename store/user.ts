import { ref } from "vue"
import { defineStore } from "pinia"
import { User } from "@/domain/entity/User"

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            user: ref<User | null>(null),
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
                items: {
                    userKey:  user.items.user_key,
                    username: user.items.username,
                    email:    user.items.email,
                    message:  user.items.message,                    
                }
            }
        },
    },
})
