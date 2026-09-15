import Link from "next/link";
import "@/components/Navbar/Navbar.css";

export default function Navbar() {
    return(
        <nav className="navbarBody">
            <div className="navbarContent">
                <div className="mainButtons">
                    <Link href="/">
                        <img className="navIcon" src="/media/icons/home-icon.png"/>
                    </Link>
                    <Link href="/dashboard">
                        <img className="navIcon" src="/media/icons/dashboard-icon.png"/>
                    </Link>
                </div>
                <Link className="logoutButton" href="/">
                    <img className="navIcon" src="/media/icons/logout-icon.png"/>
                </Link>
            </div>
        </nav>
    )
}