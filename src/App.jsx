import { useEffect, useLayoutEffect, useRef, useState } from "react";

import Cover from "./components/Cover";
import CoupleProfile from "./components/CoupleProfile";
import QuranVerse from "./components/QuranVerse";
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showCover, setShowCover] = useState(true);
  const [isCoverOpened, setIsCoverOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [isMusicStarted, setIsMusicStarted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const touchStartX = useRef(0);
  const ignoreSwipe = useRef(false);
  const wheelSum = useRef(0);
  const wheelReset = useRef(null);
  const touchStartY = useRef(0);
  const audioRef = useRef(null);

  const totalSlides = 11;

  const playlist = [
    "/music/homecoming.mp3",
    "/music/companions.mp3",
    "/music/experienced-many-battles.mp3",
    "/music/gentle-hands.mp3",
    "/music/nindo.mp3",
    "/music/samidare.mp3",
  ];

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (!isMusicStarted) return;
    if (!audioRef.current) return;

    audioRef.current.load();
    if (!isMusicPlaying) return;

    audioRef.current
      .play()
      .then(() => {
        setIsMusicPlaying(true);
      })
      .catch((error) => {
        console.log("Gagal lanjut musik:", error);
      });
  }, [currentMusicIndex, isMusicStarted]);

  const startMusic = async () => {
    try {
      if (!audioRef.current) return;

      audioRef.current.volume = 0.45;
      await audioRef.current.play();

      setIsMusicStarted(true);
      setIsMusicPlaying(true);
    } catch (error) {
      console.log("Musik gagal diputar:", error);
    }
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      await audioRef.current.play();
      setIsMusicPlaying(true);
    } else {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    }
  };

  const handleMusicEnded = () => {
    setCurrentMusicIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= playlist.length ? 0 : nextIndex;
    });
  };

  const backToCover = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide(0);
    setShowCover(true);
    setIsCoverOpened(false);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToSlide = (targetSlide) => {
    if (isAnimating) return;
    if (showCover) return;

    if (targetSlide < 0) {
      backToCover();
      return;
    }

    if (targetSlide >= totalSlides) return;

    setIsAnimating(true);
    setCurrentSlide(targetSlide);

    setTimeout(() => {
      setIsAnimating(false);
    }, 850);
  };

  const nextSlide = () => {
    goToSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    goToSlide(currentSlide - 1);
  };

  const handleOpenInvitation = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsCoverOpened(true);
    startMusic();

    setTimeout(() => {
      setShowCover(false);
      setIsAnimating(false);
    }, 2000);
  };

  const handleWheel = (event) => {
    if (isAnimating || showCover) return;

    if (event.target.closest("input, textarea, select, button, a, [data-no-slide]")) return;
    wheelSum.current += event.deltaY;
    clearTimeout(wheelReset.current);
    wheelReset.current = setTimeout(() => { wheelSum.current = 0; }, 220);
    if (Math.abs(wheelSum.current) < 85) return;
    const direction = Math.sign(wheelSum.current);
    wheelSum.current = 0;
    goToSlide(currentSlide + direction);
  };

  const handleTouchStart = (event) => {
    ignoreSwipe.current = Boolean(event.target.closest("input, textarea, select, button, a, label, [data-no-slide]"));
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event) => {
    if (isAnimating || showCover || ignoreSwipe.current) return;

    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    const minSwipeDistance = 45;

    const isHorizontalSwipe = Math.abs(diffX) > Math.abs(diffY);
    const isVerticalSwipe = Math.abs(diffY) > Math.abs(diffX);

    if (isVerticalSwipe && Math.abs(diffY) > minSwipeDistance) {
      if (diffY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    if (isHorizontalSwipe && Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  return (
    <main
      className="relative h-[100dvh] w-screen overflow-hidden bg-[#FAF7F2] text-[#3B2F2F]"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="h-full w-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateY(-${currentSlide * 100}%)`,
        }}
      >
        <Slide>
          <CoupleProfile />
        </Slide>

        <Slide>
          <QuranVerse />
        </Slide>

        <Slide>
          <LoveStory />
        </Slide>

        <Slide>
          <Countdown />
        </Slide>

        <Slide>
          <EventInfo />
        </Slide>

        <Slide>
          <MapsSection />
        </Slide>

        <Slide>
          <Gallery />
        </Slide>

        <Slide>
          <RsvpForm />
        </Slide>

        <Slide>
          <GiftSection />
        </Slide>

        <Slide>
          <GuestBook />
        </Slide>

        <Slide>
          <Footer />
        </Slide>
      </div>

      {showCover && (
        <Cover
          isOpened={isCoverOpened}
          onOpenInvitation={handleOpenInvitation}
        />
      )}

      {!showCover && (
        <>
          <SlideIndicator currentSlide={currentSlide} totalSlides={totalSlides} />
          <SlideHint />
        </>
      )}

      {isMusicStarted && (
        <button
          onClick={toggleMusic}
          data-no-slide
          className="fixed bottom-4 left-4 z-[80] rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#3B2F2F] shadow-md backdrop-blur transition hover:bg-white"
        >
          {isMusicPlaying ? "Pause Musik" : "Play Musik"}
        </button>
      )}

      <audio
        ref={audioRef}
        src={playlist[currentMusicIndex]}
        onEnded={handleMusicEnded}
        onPlay={() => setIsMusicPlaying(true)}
        onPause={() => setIsMusicPlaying(false)}
        preload="auto"
      />
    </main>
  );
}

function Slide({ children }) {
  const viewportRef = useRef(null);
  const contentRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) return;
    const measure = () => {
      // Ukur konten pada skala asli; setiap slide harus muat tanpa scroll.
      const availableHeight = viewport.clientHeight - 16;
      const naturalHeight = content.scrollHeight;
      const availableWidth = viewport.clientWidth - 16;
      const naturalWidth = content.scrollWidth;
      setScale(Math.min(1, availableHeight / Math.max(1, naturalHeight), availableWidth / Math.max(1, naturalWidth)));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(content);
    measure();
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={viewportRef} className="wedd-slide relative h-full w-full overflow-hidden">
      <div
        ref={contentRef}
        className="wedd-slide-content absolute inset-x-0 top-1/2 w-full"
        style={{ transform: `translateY(-50%) scale(${scale})`, transformOrigin: "center center" }}
      >
        {children}
      </div>
    </section>
  );
}

function SlideIndicator({ currentSlide, totalSlides }) {
  return (
    <div className="fixed right-2 top-1/2 z-[60] flex -translate-y-1/2 flex-col gap-1.5 md:right-4 md:gap-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
          key={index}
          className={`h-2 w-2 rounded-full transition-all ${currentSlide === index
              ? "h-6 bg-[#3B2F2F]"
              : "bg-[#3B2F2F]/30"
            }`}
        />
      ))}
    </div>
  );
}

function SlideHint() {
  return (
    <div className="pointer-events-none fixed bottom-2 left-1/2 z-[60] -translate-x-1/2 text-center text-xs text-[#3B2F2F]/60">
      <p>Scroll / swipe untuk pindah slide</p>
    </div>
  );
}

export default App;