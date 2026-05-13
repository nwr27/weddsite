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
    </section>
  );
}

export default CoupleProfile;