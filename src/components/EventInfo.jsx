import { weddingData } from "../data/weddingData";

function EventInfo() {
  const { event } = weddingData;

  return (
    <section className="h-screen px-6 py-10 max-w-5xl mx-auto text-center flex flex-col justify-center">
      <p className="uppercase tracking-[0.3em] text-sm text-[#A77C45] mb-3">
        Detail Acara
      </p>

      <h2 className="text-3xl md:text-4xl font-serif mb-12">
        Waktu & Tempat
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-md p-8">
          <h3 className="text-3xl font-serif mb-4">Akad Nikah</h3>
          <p className="text-lg font-semibold mb-2">{event.dateText}</p>
          <p className="mb-4">{event.akadTime}</p>
          <p className="font-semibold">{event.place}</p>
          <p className="text-[#6B5A50]">{event.address}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-8">
          <h3 className="text-3xl font-serif mb-4">Resepsi</h3>
          <p className="text-lg font-semibold mb-2">{event.dateText}</p>
          <p className="mb-4">{event.receptionTime}</p>
          <p className="font-semibold">{event.place}</p>
          <p className="text-[#6B5A50]">{event.address}</p>
        </div>
      </div>
    </section>
  );
}

export default EventInfo;