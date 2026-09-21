import Link from "next/link";
import "../auth.css";

export default function Register() {
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
                        <input id="register-name" autoComplete="name" placeholder="Enter your name..." />
                    </div>
                    <div className="authField">
                        <label htmlFor="register-email">Email address</label>
                        <input id="register-email" type="email" autoComplete="email" placeholder="Enter your email..." />
                    </div>
                    <div className="authField">
                        <label htmlFor="register-password">Password</label>
                        <input id="register-password" type="password" autoComplete="new-password" placeholder="Enter your password..." />
                    </div>
                    <div className="authField">
                        <label htmlFor="register-confirm-password">Confirm password</label>
                        <input id="register-confirm-password" type="password" autoComplete="new-password" placeholder="Confirm your password..." />
                    </div>
                </div>
                <button className="authButton">Register</button>
                <div className="authExtras">
                    <span>Already have an account?</span>
                    <Link href="/auth/login">Log in</Link>
                </div>
            </div>
        </main>
    );
}
