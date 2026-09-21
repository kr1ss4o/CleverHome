import Link from "next/link";
import "@/components/Navbar/Navbar.css";

export default function Navbar() {
    return(
        <nav className="navbarBody">
            <div className="navbarContent">
                <div className="groupButtons">
                    <Link href="/">
                        <img className="navIcon" src="/media/icons/home-icon.png"/>
                    </Link>
                    <Link href="/dashboard">
                        <img className="navIcon" src="/media/icons/dashboard-icon.png"/>
                    </Link>
                </div>
                <div className="groupButtons">
                    <Link href="/account">
                        <img className="navIcon" src="/media/icons/account-icon.png"/>
                    </Link>
                    <Link href="/">
                        <img className="navIcon" src="/media/icons/logout-icon.png"/>
                    </Link>
                    <Link href="/auth/login">
                        <img className="navIcon" src="/media/icons/login-icon.png"/>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
