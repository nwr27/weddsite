import { weddingData } from "../data/weddingData";

function MapsSection() {
  const { event } = weddingData;

  return (
    <section className="h-screen px-6 py-10 bg-[#EFE3D0] text-center flex flex-col justify-center">
      <p className="uppercase tracking-[0.3em] text-sm text-[#A77C45] mb-3">
        Lokasi Acara
      </p>

      <h2 className="text-3xl md:text-4xl font-serif mb-6">
        {event.place}
      </h2>

      <p className="mb-8 text-[#5B4A42]">{event.address}</p>

      <a
        href={event.mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block bg-[#3B2F2F] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#5A463C] transition"
      >
        Buka Google Maps
      </a>
    </section>
  );
}

export default MapsSection;