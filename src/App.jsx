import { useEffect, useRef, useState } from "react";

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showCover, setShowCover] = useState(true);
  const [isCoverOpened, setIsCoverOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [isMusicStarted, setIsMusicStarted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const audioRef = useRef(null);

  const totalSlides = 10;

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
    }, 1400);
  };

  const handleWheel = (event) => {
    if (isAnimating || showCover) return;

    if (event.deltaY > 80) {
      nextSlide();
    }

    if (event.deltaY < -80) {
      prevSlide();
    }
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event) => {
    if (isAnimating || showCover) return;

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
      className="relative h-screen w-screen overflow-hidden bg-[#FAF7F2] text-[#3B2F2F]"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="h-full w-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateY(-${currentSlide * 100}vh)`,
        }}
      >
        <Slide>
          <CoupleProfile />
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
          <LoveStory />
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
          className="fixed bottom-4 left-4 z-[80] rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#3B2F2F] shadow-md backdrop-blur transition hover:bg-white"
        >
          {isMusicPlaying ? "Pause Musik" : "Play Musik"}
        </button>
      )}

      <audio
        ref={audioRef}
        src={playlist[currentMusicIndex]}
        onEnded={handleMusicEnded}
        preload="auto"
      />
    </main>
  );
}

function Slide({ children }) {
  return (
    <section className="h-screen w-screen overflow-hidden">
      {children}
    </section>
  );
}

function SlideIndicator({ currentSlide, totalSlides }) {
  return (
    <div className="fixed right-4 top-1/2 z-[60] hidden -translate-y-1/2 flex-col gap-2 md:flex">
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
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 text-center text-xs text-[#3B2F2F]/60">
      <p>Scroll / swipe untuk pindah slide</p>
    </div>
  );
}

export default App;