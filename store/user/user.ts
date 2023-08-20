import { defineStore } from "pinia"
import { User } from "@/domain/entity/user/user"

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            user: {
                types: "",
                status: 0,
                items: {
                    user_key:   "",
                    name:       "",
                    email:      "",
                    token:      "",
                    image_path: "",
                    message:    "",                    
                }
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
        update(user: User) {
            this.user = {
                types:  user.types,
                status: user.status,
                items: {
                    user_key:   user.items.user_key,
                    name:       user.items.name,
                    email:      user.items.email,
                    token:      "",
                    image_path: user.items.image_path,
                    message:    user.items.message,                    
                }
            }
        },
        delete() {
            this.user = {
                types: "",
                status: 0,
                items: {
                    user_key:   "",
                    name:       "",
                    email:      "",
                    token:      "",
                    image_path: "",
                    message:    "",                    
                }
            };
        },
    },
})
