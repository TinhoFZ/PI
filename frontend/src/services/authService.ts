import api from "../api/api";
import type { User } from "../types/User";

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export async function login(
    data: LoginData
) {
    const response = await api.post(
        "/auth/login",
        data
    );

    return response.data;
}

export async function register(
    data: RegisterData
) {
    const response = await api.post(
        "/auth/register",
        data
    );

    return response.data;
}

export async function getMe() {
    const response =
        await api.get<User>(
            "/me"
        );

    return response.data;
}