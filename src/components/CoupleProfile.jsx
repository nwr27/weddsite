import { weddingData } from "../data/weddingData";

function CoupleProfile() {
  const { groom, bride } = weddingData;

  return (
    <section id="profil" className="h-screen px-6 py-10 max-w-5xl mx-auto text-center flex flex-col justify-center">
      <p className="text-sm uppercase tracking-[0.3em] text-[#A77C45] mb-3">
        Assalamu'alaikum Warahmatullahi Wabarakatuh
      </p>

      <h2 className="text-3xl md:text-4xl font-serif mb-6">
        Dengan Rahmat Allah SWT
      </h2>

      <p className="max-w-2xl mx-auto mb-14 leading-relaxed text-[#5B4A42]">
        Tanpa mengurangi rasa hormat, kami bermaksud mengundang
        Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white rounded-3xl shadow-md p-6">
          <img
            src={groom.image}
            alt={groom.name}
            className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full mx-auto mb-4 border-4 border-[#E8D6B8]"
          />

          <h3 className="text-3xl font-serif mb-3">{groom.name}</h3>

          <p className="text-[#5B4A42]">
            Putra dari Bapak {groom.father}
            <br />
            dan Ibu {groom.mother}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-6">
          <img
            src={bride.image}
            alt={bride.name}
            className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full mx-auto mb-4 border-4 border-[#E8D6B8]"
          />

          <h3 className="text-3xl font-serif mb-3">{bride.name}</h3>

          <p className="text-[#5B4A42]">
            Putri dari Bapak {bride.father}
            <br />
            dan Ibu {bride.mother}
          </p>
        </div>
      </div>
      <div className="mt-10 max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-[32px] border border-[#E8D6B8] bg-white/70 px-6 py-8 md:px-10 md:py-10 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-sm">
          {/* Ornamen blur lembut */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#EAD7B7]/30 blur-3xl"></div>
          <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-[#DCC3A3]/30 blur-3xl"></div>

          {/* Label */}
          <div className="mb-4 text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-[#B58A52]">
              QS. Ar-Rum : 21
            </p>
          </div>

          {/* Ayat Arab */}
          <p className="mx-auto max-w-4xl text-center text-[22px] leading-[2.2] md:text-[30px] md:leading-[2.3] text-[#4A3428] font-serif">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا
            لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ
            إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
          </p>

          {/* Garis pemisah */}
          <div className="my-6 flex items-center justify-center">
            <div className="h-px w-16 bg-[#D8C2A3]"></div>
            <div className="mx-3 h-2 w-2 rounded-full bg-[#C9A46A]"></div>
            <div className="h-px w-16 bg-[#D8C2A3]"></div>
          </div>

          {/* Arti */}
          <p className="mx-auto max-w-4xl text-center text-sm leading-7 text-[#6B5A50] md:text-base md:leading-8 italic">
            “Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan
            untukmu pasangan-pasangan dari jenismu sendiri, agar kamu cenderung
            dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa
            kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar
            terdapat tanda-tanda bagi kaum yang berpikir.”
          </p>
        </div>
      </div>
    </section>
  );
}

export default CoupleProfile;