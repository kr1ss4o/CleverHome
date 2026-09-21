import Image from "next/image";
import Link from "next/link";
import FooterFAQ from "./FooterFAQ";
import "@/components/Footer/Footer.css";

export default function Footer() {
    return (
        <footer className="footerBody">
            <div className="footerInner">
                <div className="footerContent">
                    <nav className="footerSection" aria-labelledby="footer-explore">
                        <h2 id="footer-explore" className="footerTitle">Explore</h2>
                        <ul className="footerLinks">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/dashboard">Dashboard</Link></li>
                            <li><Link href="/account">My account</Link></li>
                        </ul>
                    </nav>

                    <nav className="footerSection" aria-labelledby="footer-account">
                        <h2 id="footer-account" className="footerTitle">Account access</h2>
                        <ul className="footerLinks">
                            <li><Link href="/auth/login">Log in</Link></li>
                            <li><Link href="/auth/register">Create an account</Link></li>
                            <li><Link href="/reset-password">Reset password</Link></li>
                        </ul>
                    </nav>

                    <section className="footerSection" aria-labelledby="footer-faq">
                        <h2 id="footer-faq" className="footerTitle">FAQ</h2>
                        <FooterFAQ />
                    </section>

                    <section className="footerSection" aria-labelledby="footer-support">
                        <h2 id="footer-support" className="footerTitle">Support</h2>
                        <address className="footerContact">
                            <a href="mailto:info@cleverhome.com">info@cleverhome.com</a>
                            <a href="tel:+31991234567">+31 99 123 4567</a>
                        </address>
                    </section>
                </div>

                <div className="footerBottom">
                    <Link href="/" className="footerBrand">
                        <Image src="/media/icons/ch-icon.png" alt="" width={40} height={40} />
                        <span>CleverHome</span>
                    </Link>
                    <p className="footerCopyright">© 2026 CleverHome. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
