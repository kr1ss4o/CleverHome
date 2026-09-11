import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Home/Hero/Hero";
import Bubble from "@/components/Home/Bubble/Bubble";
import Footer from "@/components/Footer/Footer";

import "@/components/Home/Home.css";

export default function Home() {
  return (
    <div className="homeContainer">
        <Hero />
        <div className="bubblesContainer">
          <Bubble
            bubbleIcon="/media/icons/GlobeIcon.png"
            bubbleDescription="Connect from any place in the world with an internet connection."
          />
          <Bubble
            bubbleIcon="/media/icons/FastIcon.png"
            bubbleDescription="Fast and easy connection. Just log in to your account and you're good to go."
          />
          <Bubble
            bubbleIcon="/media/icons/ShareIcon.png"
            bubbleDescription="Simple built-in controls make the app accessible to everyone."/>
          <Bubble
            bubbleIcon="/media/icons/StarIcon.png"
            bubbleDescription="Completely free to use. No hidden fees, no subscriptions."
          />
        </div>
    </div>
  )
}
