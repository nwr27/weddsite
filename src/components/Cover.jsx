import { weddingData } from "../data/weddingData";

function Cover({ isOpened, onOpenInvitation }) {
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get("to") || "Bapak/Ibu/Saudara/i";

  return (
    <section className="fixed inset-0 z-[100] h-screen w-screen overflow-hidden bg-transparent">
      {/* Sisi kiri gambar cover */}
      <div
        className={`absolute left-0 top-0 h-full w-1/2 overflow-hidden transition-transform duration-[1400ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${isOpened ? "-translate-x-full" : "translate-x-0"
          }`}
      >
        <img
          src="/images/cover.png"
          alt="Wedding Cover Left"
          className="absolute left-0 top-0 h-full w-[200%] object-cover"
        />
      </div>

      {/* Sisi kanan gambar cover */}
      <div
        className={`absolute right-0 top-0 h-full w-1/2 overflow-hidden transition-transform duration-[1400ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${isOpened ? "translate-x-full" : "translate-x-0"
          }`}
      >
        <img
          src="/images/cover.png"
          alt="Wedding Cover Right"
          className="absolute right-0 top-0 h-full w-[200%] object-cover"
        />
      </div>

      {/* Overlay gelap kiri */}
      <div
        className={`pointer-events-none absolute left-0 top-0 h-full w-1/2 bg-black/45 transition-transform duration-[1400ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${isOpened ? "-translate-x-full" : "translate-x-0"
          }`}
      />

      {/* Overlay gelap kanan */}
      <div
        className={`pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-black/45 transition-transform duration-[1400ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${isOpened ? "translate-x-full" : "translate-x-0"
          }`}
      />

      {/* Garis belahan tengah */}
      <div
        className={`absolute left-1/2 top-0 z-20 h-full w-[2px] -translate-x-1/2 bg-white/40 transition-opacity duration-500 ${isOpened ? "opacity-0" : "opacity-100"
          }`}
      />

      {/* Isi cover */}
      <div
        className={`relative z-30 flex h-screen items-center justify-center px-6 text-center text-white transition-all duration-700 ${isOpened
            ? "translate-y-8 scale-95 opacity-0"
            : "translate-y-0 scale-100 opacity-100"
          }`}
      >
        <div className="max-w-xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em]">
            The Wedding of
          </p>

          <h1 className="mb-4 font-serif text-5xl md:text-7xl">
            Naruto & Hinata
          </h1>

          <p className="mb-8 text-lg">{weddingData.event.dateText}</p>

          <div className="mb-8 rounded-2xl bg-white/15 p-5 backdrop-blur-md">
            <p className="mb-1 text-sm">Kepada Yth.</p>
            <h2 className="text-2xl font-semibold">{guestName}</h2>
          </div>

          <button
            onClick={onOpenInvitation}
            disabled={isOpened}
            className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-[#3B2F2F] transition hover:bg-[#EEDFC8] disabled:opacity-60"
          >
            Buka Undangan
          </button>

          <p className="mt-6 text-sm text-white/80">
            Klik tombol untuk membuka undangan
          </p>
        </div>
      </div>
    </section>
  );
}

export default Cover;