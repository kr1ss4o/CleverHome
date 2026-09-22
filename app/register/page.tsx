"use client";

import Link from "next/link";
import { useState } from "react";
import "@/app/auth/auth.css";
import { useRouter } from "next/navigation";

export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    async function RegisterUser() {

        if (password !== confirmPassword) {
            return;
        }

        const response = await fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })

        if (!response.ok) {
            const data = await response.json();
            console.log(data.error);
            return;
        }
        
        const data = await response.json();
        router.push("/login");
    }

    return (
        <main className="mainPageContainer authContainer registerContainer">
            <div className="authPanel">
                <header className="authHeader">
                    <h1>Join us now</h1>
                    <p>One account. Your home, connected.</p>
                </header>
                <div className="authFields">
                    <div className="authField">
                        <label htmlFor="register-name">Full name</label>
                        <input id="register-name" autoComplete="name" placeholder="Enter your name..."
                            value={name} onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="authField">
                        <label htmlFor="register-email">Email address</label>
                        <input id="register-email" type="email" autoComplete="email" placeholder="Enter your email..."
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="authField">
                        <label htmlFor="register-password">Password</label>
                        <input id="register-password" type="password" autoComplete="new-password" placeholder="Enter your password..."
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="authField">
                        <label htmlFor="register-confirm-password">Confirm password</label>
                        <input id="register-confirm-password" type="password" autoComplete="new-password" placeholder="Confirm your password..."
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>
                <button className="authButton" onClick={() => RegisterUser() }>
                    Register
                </button>
                <div className="authExtras">
                    <span>Already have an account?</span>
                    <Link href="/login">Log in</Link>
                </div>
            </div>
        </main>
    );
}
