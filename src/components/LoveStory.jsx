import { weddingData } from "../data/weddingData";

function LoveStory() {
  return (
    <section className="h-screen px-6 py-8 max-w-4xl mx-auto flex flex-col justify-center">
      <div className="text-center mb-12">
        <p className="uppercase tracking-[0.3em] text-sm text-[#A77C45] mb-3">
          Cerita Kami
        </p>

        <h2 className="text-3xl md:text-4xl font-serif">
          Love Story
        </h2>
      </div>

      <div className="space-y-3">
        {weddingData.loveStory.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-4 border-l-4 border-[#C9A46A]"
          >
            <p className="text-sm text-[#A77C45] font-semibold mb-1">
              {item.year}
            </p>

            <h3 className="text-2xl font-serif mb-2">{item.title}</h3>

            <p className="text-[#5B4A42] leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LoveStory;