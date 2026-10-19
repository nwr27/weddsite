
import { useEffect, useRef, useState } from "react";
import SlideContent from "./components/SlideContent.jsx";
import { musicManager } from "./audio/musicManager.js";

const slides = [
  "opening",
  "verse",
  "countdown",
  "event",
  "gallery",
  "guestbook",
  "rsvp",
  "gift",
  "story",
  "closing",
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [opened, setOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const touchStart = useRef(null);
  const lastWheel = useRef(0);

  useEffect(() => {
    return musicManager.subscribe(setMusicPlaying);
  }, []);

  useEffect(() => {
    if (opened) {
      musicManager.onSlideChange(index);
    }
  }, [index, opened]);

  const openInvitation = () => {
    // Dipanggil langsung dari klik agar Safari mengizinkan audio.
    musicManager.play();
    setOpened(true);
  };

  const toggleMusic = () => {
    if (musicPlaying) {
      musicManager.stop();
    } else {
      musicManager.play();
    }
  };

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

    const deltaY =
      event.changedTouches[0].clientY - touchStart.current.y;
    const deltaX =
      event.changedTouches[0].clientX - touchStart.current.x;

    touchStart.current = null;

    if (Math.abs(deltaY) > 55 && Math.abs(deltaY) > Math.abs(deltaX)) {
      go(deltaY < 0 ? 1 : -1);
    }
  };

  const handleWheel = (event) => {
    if (Math.abs(event.deltaY) < 12) return;

    const now = Date.now();
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

          <button onClick={openInvitation}>
            Buka Undangan
          </button>
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

          <button
            type="button"
            className="music-toggle"
            onClick={toggleMusic}
            aria-label={
              musicPlaying ? "Hentikan musik" : "Putar musik"
            }
            aria-pressed={musicPlaying}
            title={musicPlaying ? "Stop musik" : "Play musik"}
          >
            {musicPlaying ? "Ⅱ" : "▶"}
          </button>

          <nav
            className="slide-pagination"
            aria-label="Navigasi slide"
          >
            {slides.map((slide, i) => (
              <button
                key={slide}
                type="button"
                className={`pagination-dot ${index === i ? "active" : ""
                  }`}
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
