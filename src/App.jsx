import { useRef, useState } from "react";
import SlideContent from "./components/SlideContent.jsx";

const slides = [
  "opening", "verse", "countdown", "event", "gallery",
  "rsvp", "gift", "story", "guestbook", "closing",
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [opened, setOpened] = useState(false);
  const touchStart = useRef(null);
  const lastWheel = useRef(0);

  const go = (direction) => {
    setIndex((current) =>
      Math.max(0, Math.min(slides.length - 1, current + direction))
    );
  };

  const handleTouchStart = (event) => {
    touchStart.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  };

  const handleTouchEnd = (event) => {
    if (!touchStart.current) return;
    const deltaY = event.changedTouches[0].clientY - touchStart.current.y;
    const deltaX = event.changedTouches[0].clientX - touchStart.current.x;
    touchStart.current = null;

    // Geser ke atas = slide berikutnya; ke bawah = sebelumnya.
    if (Math.abs(deltaY) > 55 && Math.abs(deltaY) > Math.abs(deltaX)) {
      go(deltaY < 0 ? 1 : -1);
    }
  };

  const handleWheel = (event) => {
    if (Math.abs(event.deltaY) < 12) return;
    const now = Date.now();
    // Mencegah satu putaran roda mouse melompati banyak slide.
    if (now - lastWheel.current < 650) return;
    lastWheel.current = now;
    go(event.deltaY > 0 ? 1 : -1);
  };

  return (
    <main className="site">
      {!opened ? (
        <section className="welcome">
          <p>Undangan Pernikahan</p>
          <h1>Nana &amp; Meysa</h1>
          <button onClick={() => setOpened(true)}>Buka Undangan</button>
        </section>
      ) : (
        <section
          className="slide"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          <div className="slide-body" key={slides[index]}>
            <SlideContent id={slides[index]} />
          </div>
          <nav className="slide-pagination" aria-label="Navigasi slide">
            {slides.map((slide, i) => (
              <button
                key={slide}
                type="button"
                className={`pagination-dot ${index === i ? "active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Buka slide ${i + 1}`}
                aria-current={index === i ? "step" : undefined}
              />
            ))}
          </nav>
        </section>
      )}
    </main>
  );
}
