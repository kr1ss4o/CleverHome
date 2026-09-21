import Link from "next/link";
import "../auth.css";

export default function Login() {
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
                        <input id="login-email" type="email" autoComplete="email" placeholder="Enter your email..." />
                    </div>
                    <div className="authField">
                        <label htmlFor="login-password">Password</label>
                        <input id="login-password" type="password" autoComplete="current-password" placeholder="Enter your password..." />
                    </div>
                </div>
                <button className="authButton">Login</button>
                <div className="authExtras">
                    <Link href="/auth/register">Create an account</Link>
                    <span aria-hidden="true">•</span>
                    <Link href="/reset-password">Forgot password</Link>
                </div>
            </div>
        </main>
    );
}
