export interface AuthResponse {
    user: {
        id: number;
        nombre: string;
        email: string;
        password: string;
        rol: string;
    },
    access_token: string
}
