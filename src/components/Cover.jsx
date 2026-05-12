import { weddingData } from "../data/weddingData";

function Cover() {
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get("to") || "Bapak/Ibu/Saudara/i";

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      <img
        src="/images/cover.jpg"
        alt="Wedding Cover"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/45"></div>

      <div className="relative z-10 px-6 text-white max-w-xl">
        <p className="tracking-[0.3em] uppercase text-sm mb-4">
          The Wedding of
        </p>

        <h1 className="text-5xl md:text-7xl font-serif mb-4">
          Naruto & Hinata
        </h1>

        <p className="text-lg mb-8">{weddingData.event.dateText}</p>

        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 mb-8">
          <p className="text-sm mb-1">Kepada Yth.</p>
          <h2 className="text-2xl font-semibold">{guestName}</h2>
        </div>

        <a
          href="#profil"
          className="inline-block bg-white text-[#3B2F2F] px-8 py-3 rounded-full font-semibold hover:bg-[#EEDFC8] transition"
        >
          Buka Undangan
        </a>
      </div>
    </section>
  );
}

export default Cover;