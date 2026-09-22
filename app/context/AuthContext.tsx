"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function getUser() {

            const response = await fetch("/api/user");

            if (response.ok) {
                const data = await response.json();
                setUser(data);
            }

            setLoading(false);
        }

        getUser();

    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}