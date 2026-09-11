import Link from "next/link";
import "@/components/Navbar/Navbar.css";

export default function Navbar() {
    return(
        <nav className="navbarBody">
            <div className="navbarContent">
                <div className="mainButtons">
                    <Link href="/">
                        Home
                    </Link>
                    <Link href="/">
                        Dashboard
                    </Link>
                </div>
                <Link className="logoutButton" href="/">
                    Logout
                </Link>
            </div>
        </nav>
    )
}