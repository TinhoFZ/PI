import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/api";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] =
        useState("");

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        try {
            await api.post(
                "/auth/register",
                {
                    name,
                    email,
                    password,
                }
            );

            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar");
        }
    }

    return (
        <div>
            <h1>Cadastro</h1>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Nome"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button type="submit">
                    Cadastrar
                </button>
            </form>

            <p>
                Já possui conta?
                <Link to="/">
                    {" "}Entrar
                </Link>
            </p>
        </div>
    );
}