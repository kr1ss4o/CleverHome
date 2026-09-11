import "@/components/Footer/Footer.css"

export default function Footer() {
    return (
        <footer className="footerBody">
            <div className="footerContent">
                <div>
                    <h1 className="contentTitle">FAQ:</h1>
                    <h2 className="contentSubtitle">What type of devices are compatible?</h2>
                    <h2 className="contentSubtitle">How many devices can I connect?</h2>
                </div>
                <div>
                    <h1 className="contentTitle">Support:</h1>
                    <h2 className="contentSubtitle">info@cleverhome.com</h2>
                    <h2 className="contentSubtitle">+31 99 123 4567</h2>
                </div>
            </div>
            <div className="footerCopyright">
                <img src="/media/icons/CleverHomeLogo.png" alt="CleverHome Logo" />
                <p>© 2026 All rights reserved</p>
            </div>
        </footer>
    )
}