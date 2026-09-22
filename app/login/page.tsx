"use client";

import Link from "next/link";
import "@/app/auth/auth.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useAuth();
    const router = useRouter();

    async function LoginUser() {

        const response = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (response.ok) {
            const data = await response.json();
            setUser(data);
            router.push("/dashboard");
        }
    }

    return (
        <main className="mainPageContainer authContainer loginContainer">
            <div className="authPanel">
                <header className="authHeader">
                    <h1>Welcome back</h1>
                    <p>Your home, just a login away.</p>
                </header>
                <div className="authFields">
                    <div className="authField">
                        <label htmlFor="login-email">Email address</label>
                        <input id="login-email" type="email" autoComplete="email" placeholder="Enter your email..."
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="authField">
                        <label htmlFor="login-password">Password</label>
                        <input id="login-password" type="password" autoComplete="current-password" placeholder="Enter your password..."
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <button className="authButton" onClick={() => LoginUser()}>Login</button>
                <div className="authExtras">
                    <Link href="/register">Create an account</Link>
                    <span aria-hidden="true">•</span>
                    <Link href="/reset-password">Forgot password</Link>
                </div>
            </div>
        </main>
    );
}
