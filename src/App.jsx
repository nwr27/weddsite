import { useEffect, useState } from "react";

import Cover from "./components/Cover";
import CoupleProfile from "./components/CoupleProfile";
import Countdown from "./components/Countdown";
import EventInfo from "./components/EventInfo";
import MapsSection from "./components/MapsSection";
import LoveStory from "./components/LoveStory";
import Gallery from "./components/Gallery";
import GiftSection from "./components/GiftSection";
import RsvpForm from "./components/RsvpForm";
import GuestBook from "./components/GuestBook";
import Footer from "./components/Footer";

function App() {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpened]);

  const handleOpenInvitation = () => {
    setIsOpened(true);

    setTimeout(() => {
      const target = document.getElementById("profil");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#3B2F2F]">
      <Cover onOpenInvitation={handleOpenInvitation} />

      <div
        className={`transition-opacity duration-700 ${isOpened ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <CoupleProfile />
        <Countdown />
        <EventInfo />
        <MapsSection />
        <LoveStory />
        <Gallery />
        <RsvpForm />
        <GiftSection />
        <GuestBook />
        <Footer />
      </div>
    </main>
  );
}

export default App;