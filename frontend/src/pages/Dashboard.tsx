import {
    useEffect,
    useState,
} from "react";

import api from "../api/api";

import Navbar from "../components/Navbar";

import type {
    User,
} from "../types/User";

export default function Dashboard() {
    const [user, setUser] =
        useState<User | null>(
            null
        );

    useEffect(() => {
        async function loadUser() {
            const response =
                await api.get<User>(
                    "/me"
                );

            setUser(
                response.data
            );
        }

        loadUser();
    }, []);

    if (!user) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            <Navbar />

            <h1>
                Bem-vindo,
                {" "}
                {user.name}
            </h1>

            <p>
                {user.email}
            </p>
        </>
    );
}