import CoverImage from "@/components/Home/Hero/CoverImage/CoverImage";
import "@/components/Home/Hero/Hero.css";

export default function Hero() {
    return (
        <div className="heroContainer">
            <div className="heroTextContainer">
                <h1 className="heroTitle">CleverHome</h1>
                <h1 className="heroSubtitle">
                    Control your home devices{" "}
                    <span className="purpleText">
                        remotely using your phone
                    </span>{" "}
                    from the other side of{" "}
                    <span className="greenText">
                        the planet
                    </span>
                </h1>
            </div>
            <CoverImage coverImage="/media/Cover.png" />
        </div>
    )
}