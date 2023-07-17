import type { Ref } from 'vue'

type loginUser = {
    user_key: string;
    username: string;
    email:    string;
    token:    string;
    message:  string;
}

const login = (state: Ref<loginUser>) =>  async (e: any) => {
    state.value = e
    useRouter().push('/')
}

const logout = (state: Ref<loginUser>) => async () => {
    state.value = null
    useRouter().push('/login')
}

export const useAuth = () => {
    const loginUser = useState<loginUser>('loginUser', () => null)
    return {
        loginUser,
        login: login(loginUser),
        logout: logout(loginUser),
    }
}
