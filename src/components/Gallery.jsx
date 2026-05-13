import { weddingData } from "../data/weddingData";

function Gallery() {
  return (
    <section className="h-screen px-6 py-8 bg-[#EFE3D0] flex flex-col justify-center">
      <div className="text-center mb-12">
        <p className="uppercase tracking-[0.3em] text-sm text-[#A77C45] mb-3">
          Galeri
        </p>

        <h2 className="text-3xl md:text-4xl font-serif">
          Momen Bahagia
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {weddingData.gallery.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-3xl shadow-md bg-white"
          >
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="w-full h-36 md:h-72 object-cover hover:scale-105 transition duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;