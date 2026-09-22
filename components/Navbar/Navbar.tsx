"use client";

import Link from "next/link";
import "@/components/Navbar/Navbar.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function Navbar() {

    const router = useRouter();
    const { user, setUser } = useAuth();

    async function LogoutUser() {
        const response = await fetch("/api/user/logout", {
            method: "POST"
        })

        // If the request is successful, forward to login page
        if (response.ok) {
            setUser(null);
            router.push("/login")
        }
    }

    return(
        <nav className="navbarBody">
            <div className="navbarContent">
                <div className="groupButtons">
                    <Link href="/">
                        <img className="navIcon" src="/media/icons/home-icon.png"/>
                    </Link>
                    {user && (
                            <Link href="/dashboard">
                                <img className="navIcon" src="/media/icons/dashboard-icon.png"/>
                            </Link>
                    )}
                    
                </div>
                <div className="groupButtons">
                    {user ? (
                        <>
                        <Link href="/account">
                            <img className="navIcon" src="/media/icons/account-icon.png"/>
                        </Link>
                        <button type="button" aria-label="Log out" onClick={() => LogoutUser()}>
                            <img className="navIcon" src="/media/icons/logout-icon.png" alt=""/>
                        </button>
                        </>
                        
                    ):(
                        <Link href="/login">
                            <img className="navIcon" src="/media/icons/login-icon.png"/>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}
