import OpeningSlide from "./OpeningSlide.jsx";
import { weddingData as data } from "../data/weddingData.js";
import VerseSlide from "./VerseSlide.jsx";
import CountdownSlide from "./CountdownSlide.jsx";
import EventSlide from "./EventSlide.jsx";
import GallerySlide from "./GallerySlide.jsx";

export default function SlideContent({ id }) {
  switch (id) {
    case "opening": return <OpeningSlide />;
    case "verse": return <VerseSlide />;
    case "countdown": return <CountdownSlide />;
    case "event": return <EventSlide />;
    case "gallery": return <GallerySlide />;
    case "rsvp": return <><h1>Konfirmasi Kehadiran</h1></>;
    case "gift": return <><h1>Hadiah Pernikahan</h1></>;
    case "story": return <><h1>Kisah Kami</h1><div className="stack">{data.loveStory.map((item) => <article key={item.year}><strong>{item.year} · {item.title}</strong><p>{item.text}</p></article>)}</div></>;
    case "guestbook": return <><h1>Ucapan &amp; Doa</h1></>;
    case "closing": return <><h1>Terima Kasih</h1></>;
    default: return null;
  }
}
