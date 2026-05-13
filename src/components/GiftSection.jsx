import { weddingData } from "../data/weddingData";

function GiftSection() {
  const copyToClipboard = async (number) => {
    try {
      await navigator.clipboard.writeText(number);
      alert("Nomor berhasil disalin: " + number);
    } catch (error) {
      alert("Gagal menyalin nomor.");
    }
  };

  return (
    <section className="h-screen px-6 py-8 bg-[#EFE3D0] text-center flex flex-col justify-center">
      <p className="uppercase tracking-[0.3em] text-sm text-[#A77C45] mb-3">
        Amplop Digital
      </p>

      <h2 className="text-3xl md:text-4xl font-serif mb-6">
        Wedding Gift
      </h2>

      <p className="max-w-2xl mx-auto mb-10 text-[#5B4A42]">
        Doa restu Bapak/Ibu/Saudara/i merupakan hadiah terbaik bagi kami.
        Namun apabila ingin memberikan tanda kasih, dapat melalui pilihan berikut.
      </p>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {weddingData.gifts.map((gift, index) => (
          <div key={index} className="bg-white rounded-3xl shadow-md p-6">
            <div className="flex justify-center items-center h-16 mb-4">
              <img
                src={gift.logo}
                alt={gift.type}
                className="max-h-12 md:max-h-14 object-contain"
              />
            </div>

            <p className="text-xl font-semibold tracking-wider mb-2">
              {gift.number}
            </p>

            <p className="text-[#6B5A50] mb-5">a.n {gift.name}</p>

            <button
              onClick={() => copyToClipboard(gift.number)}
              className="bg-[#3B2F2F] text-white px-6 py-2 rounded-full hover:bg-[#5A463C] transition"
            >
              Salin Nomor
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default GiftSection;