import { useState } from "react";
import SlideContent from "./components/SlideContent.jsx";

const slides = [
  ["opening"],
  ["verse"],
  ["countdown"],
  ["event"],
  ["gallery"],
  ["rsvp"],
  ["gift"],
  ["story"],
  ["guestbook"],
  ["closing"],
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [opened, setOpened] = useState(false);
  const go = (step) => setIndex((current) => Math.max(0, Math.min(slides.length - 1, current + step)));
  const handleTouchEnd = (event) => {
    if (touchStart === null) return;
    const dx = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(dx) > 55) go(dx < 0 ? 1 : -1);
    setTouchStart(null);
  };
  return (
    <main className="site">
      {!opened ? (
        <section className="welcome">
          <p>Undangan Pernikahan</p><h1>Nana &amp; Meysa</h1>
          <button onClick={() => setOpened(true)}>Buka Undangan</button>
        </section>
      ) : (
        <section className="slide" onTouchStart={(e) => setTouchStart(e.touches[0].clientX)} onTouchEnd={handleTouchEnd}>
          <div className="slide-body" key={slides[index][0]}><SlideContent id={slides[index][0]} /></div>
          <nav className="slide-nav" aria-label="Navigasi slide">
            <button disabled={index === 0} onClick={() => go(-1)}>Sebelumnya</button>
            <span>{slides[index][1]}</span>
            <button disabled={index === slides.length - 1} onClick={() => go(1)}>Berikutnya</button>
          </nav>
        </section>
      )}
    </main>
  );
}
