import OpeningSlide from "./OpeningSlide.jsx";
import { weddingData as data } from "../data/weddingData.js";
import VerseSlide from "./VerseSlide.jsx";

export default function SlideContent({ id }) {
  switch (id) {
    case "opening": return <OpeningSlide />;
    case "verse": return <VerseSlide />;
    case "countdown": return <><h1>Menuju Hari Bahagia</h1><p>{data.event.dateText}</p></>;
    case "event": return <><h1>Akad &amp; Resepsi</h1><p>{data.event.dateText}</p><p>Akad: {data.event.akadTime}</p><p>Resepsi: {data.event.receptionTime}</p><p>{data.event.place}, {data.event.address}</p></>;
    case "gallery": return <><h1>Galeri</h1><div className="gallery">{data.gallery.map((src) => <img key={src} src={src} alt="Galeri pasangan" loading="lazy" />)}</div></>;
    case "rsvp": return <><h1>Konfirmasi Kehadiran</h1></>;
    case "gift": return <><h1>Hadiah Pernikahan</h1></>;
    case "story": return <><h1>Kisah Kami</h1><div className="stack">{data.loveStory.map((item) => <article key={item.year}><strong>{item.year} · {item.title}</strong><p>{item.text}</p></article>)}</div></>;
    case "guestbook": return <><h1>Ucapan &amp; Doa</h1></>;
    case "closing": return <><h1>Terima Kasih</h1></>;
    default: return null;
  }
}
