import OpeningSlide from "./OpeningSlide.jsx";
import { weddingData as data } from "../data/weddingData.js";
import VerseSlide from "./VerseSlide.jsx";
import CountdownSlide from "./CountdownSlide.jsx";
import EventSlide from "./EventSlide.jsx";
import GallerySlide from "./GallerySlide.jsx";
import GuestbookSlide from "./GuestbookSlide.jsx";
import RSVPSlide from "./RSVPSlide.jsx";
import GiftSlide from "./GiftSlide.jsx";
import StorySlide from "./StorySlide.jsx";

export default function SlideContent({ id }) {
  switch (id) {
    case "opening": return <OpeningSlide />;
    case "verse": return <VerseSlide />;
    case "countdown": return <CountdownSlide />;
    case "event": return <EventSlide />;
    case "gallery": return <GallerySlide />;
    case "guestbook": return <GuestbookSlide />;
    case "rsvp": return <RSVPSlide />;
    case "gift": return <GiftSlide />;
    case "story": return <StorySlide />;
    case "closing": return <><h1>Terima Kasih</h1></>;
    default: return null;
  }
}
