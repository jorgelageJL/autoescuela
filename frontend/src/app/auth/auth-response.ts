export interface AuthResponse {
    user: {
        id: number;
        nombre: string;
        email: string;
        password: string;
        isAdmin: boolean;
    },
    access_token: string
}
