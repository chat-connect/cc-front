export interface UserRegister {
    types: string;
    status: number;
    items: {
        user_key: string;
        name: string;
        email: string;
        message: string;
    };
}
