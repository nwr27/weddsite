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
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#3B2F2F]">
      <Cover />
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
    </main>
  );
}

export default App;