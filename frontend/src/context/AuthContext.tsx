import { createContext, useEffect, useMemo, useState } from "react";

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

interface Props {
    children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    function login(nextToken: string) {
        localStorage.setItem("token", nextToken);
        setToken(nextToken);
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }

    const value = useMemo<AuthContextType>(
        () => ({ token, login, logout }),
        [token]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

