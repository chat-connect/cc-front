import type { Ref } from 'vue'

type registerUser = {
    user_key: string;
    username: string;
    email:    string;
    message:  string;
}

type loginUser = {
    user_key: string;
    username: string;
    email:    string;
    token:    string;
    message:  string;
}

const register = (state: Ref<registerUser>) =>  async (e: any) => {
    state.value = e
    useRouter().push('/login')
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
    const registerUser = useState<registerUser>('registerUser', () => null)
    const loginUser = useState<loginUser>('loginUser', () => null)
    return {
        loginUser,
        register: register(registerUser),
        login: login(loginUser),
        logout: logout(loginUser),
    }
}
