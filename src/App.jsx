
import { useEffect, useRef, useState } from "react";
import SlideContent from "./components/SlideContent.jsx";
import { musicManager } from "./audio/musicManager.js";
import WeddingLoader from "./components/WeddingLoader.jsx";
import { preloadImages } from "./utils/imagePreloader.js";

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

const PRIORITY_IMAGES = [
  // Opening
  "/images/bg-golden-langsat.webp",
  "/decorations/kufi-bismillah.png",
  "/decorations/portrait-frame.png",
  "/decorations/heart-ampersand.png",
  "/images/groom.jpg",
  "/images/bride.jpg",

  // Verse
  "/decorations/arum-21-kufi.png",
  "/decorations/gold-divider.png",

  // Countdown
  "/images/bg-countdown.webp",
  "/decorations/countdown-frame.png",

  // Event
  "/images/bg-event-night.webp",

  // Gallery
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",

  // Guestbook
  "/images/bg-guestbook.webp",

  // Gift
  "/icon/bca.png",
  "/icon/seabank.png",
  "/icon/dana.png",
  "/icon/gopay.webp",

  // Story
  "/images/our_story.png",

  // Closing
  "/images/closing_bg.png",
];


export default function App() {
  const [index, setIndex] = useState(0);
  const [opened, setOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loaderExiting, setLoaderExiting] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);

  const touchStart = useRef(null);
  const lastWheel = useRef(0);

  useEffect(() => {
    return musicManager.subscribe(setMusicPlaying);
  }, []);

  useEffect(() => {
    musicManager.prepare();
  }, []);

  useEffect(() => {
    if (opened) {
      musicManager.onSlideChange(index);
    }
  }, [index, opened]);

  useEffect(() => {
    let active = true;
    let finished = false;

    const finishLoading = () => {
      if (!active || finished) return;
      finished = true;
      setLoaderExiting(true);
    };

    const timeout = setTimeout(finishLoading, 20000);

    preloadImages(PRIORITY_IMAGES, (progress) => {
      if (active && !finished) {
        setLoadingProgress(progress);
      }
    })
      .then(() => {
        if (!active) return;

        clearTimeout(timeout);
        finishLoading();
      })
      .catch(() => {
        if (!active) return;

        clearTimeout(timeout);
        finishLoading();
      });

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!loaderExiting) return;
    const timer = setTimeout(() => setLoaderVisible(false), 700);
    return () => clearTimeout(timer);
  }, [loaderExiting]);

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
    // Swipe dari dalam room chat tidak boleh memindahkan slide.
    if (event.target.closest(".guestbook-messages")) {
      touchStart.current = null;
      return;
    }

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

    if (
      Math.abs(deltaY) > 55 &&
      Math.abs(deltaY) > Math.abs(deltaX)
    ) {
      go(deltaY < 0 ? 1 : -1);
    }
  };



  const handleWheel = (event) => {
    // Scroll mouse/trackpad di room chat hanya menggulir pesan.
    if (event.target.closest(".guestbook-messages")) {
      return;
    }

    if (Math.abs(event.deltaY) < 12) return;

    const now = Date.now();
    if (now - lastWheel.current < 650) return;

    lastWheel.current = now;
    go(event.deltaY > 0 ? 1 : -1);
  };


  return (
    <main className="site">
      {loaderVisible && (
        <WeddingLoader progress={loadingProgress} exiting={loaderExiting} />
      )}
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

          {slides[index] === "guestbook" && (
            <button
              type="button"
              className="guestbook-previous"
              onClick={() => go(-1)}
              aria-label="Kembali ke halaman Gallery"
            >
              <span aria-hidden="true">↑</span>
              <span>Kembali ke Gallery</span>
            </button>
          )}
          {slides[index] === "guestbook" && (
            <button
              type="button"
              className="guestbook-next"
              onClick={() => go(1)}
              aria-label="Lanjut ke halaman RSVP"
            >
              <span>Lanjut ke RSVP</span>
              <span aria-hidden="true">↓</span>
            </button>
          )}

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
