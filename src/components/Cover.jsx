import { weddingData } from "../data/weddingData";

function Cover({ isOpened, onOpenInvitation }) {
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get("to") || "Bapak/Ibu/Saudara/i";

  const coverImage = "/images/cover.png";

  return (
    <section className="fixed inset-0 z-[100] h-screen w-screen overflow-hidden bg-transparent">
      {/* POTONGAN KIRI - sudah siap di bawah gambar utuh */}
      <div
        className={`absolute left-0 top-0 z-10 h-full w-[50.7vw] overflow-hidden transition-transform duration-[1400ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${isOpened ? "-translate-x-full" : "translate-x-0"
          }`}
      >
        <img
          src={coverImage}
          alt="Wedding Cover Left"
          className="absolute left-0 top-0 h-screen w-screen max-w-none object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* POTONGAN KANAN - sudah siap di bawah gambar utuh */}
      <div
        className={`absolute right-0 top-0 z-10 h-full w-[50.7vw] overflow-hidden transition-transform duration-[1400ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${isOpened ? "translate-x-full" : "translate-x-0"
          }`}
      >
        <img
          src={coverImage}
          alt="Wedding Cover Right"
          className="absolute right-0 top-0 h-screen w-screen max-w-none object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* 1 GAMBAR UTUH - hanya untuk tampilan awal agar tidak terlihat sambungan */}
      <img
        src={coverImage}
        alt="Wedding Cover"
        className={`absolute inset-0 z-20 h-full w-full object-cover ${isOpened ? "opacity-0" : "opacity-100"
          }`}
      />

      {/* Overlay gambar utuh */}
      <div
        className={`absolute inset-0 z-20 bg-black/35 ${isOpened ? "opacity-0" : "opacity-100"
          }`}
      />

      {/* Efek magical reveal saat cover terbuka */}
      {isOpened && (
        <div className="pointer-events-none absolute inset-0 z-[60] reveal-effect">
          <div className="reveal-flash" />
          <div className="reveal-glow" />
          <div className="reveal-line" />

          <div className="reveal-mist mist-1" />
          <div className="reveal-mist mist-2" />
          <div className="reveal-mist mist-3" />
          <div className="reveal-mist mist-4" />

          <div className="sparkle sparkle-1" />
          <div className="sparkle sparkle-2" />
          <div className="sparkle sparkle-3" />
          <div className="sparkle sparkle-4" />
          <div className="sparkle sparkle-5" />
          <div className="sparkle sparkle-6" />
          <div className="sparkle sparkle-7" />
          <div className="sparkle sparkle-8" />
          <div className="sparkle sparkle-9" />
          <div className="sparkle sparkle-10" />
        </div>
      )}

      {/* Isi cover */}
      <div
        className={`relative z-30 flex h-screen items-center justify-center px-6 text-center text-white transition-all duration-700 ${isOpened
            ? "translate-y-8 scale-95 opacity-0"
            : "translate-y-0 scale-100 opacity-100"
          }`}
      >
        <div className="max-w-xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em]">
            This is For You
          </p>

          <h1 className="mb-4 font-serif text-5xl md:text-7xl">
            Wedding Invitation
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