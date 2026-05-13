import { useState } from "react";

function GuestBook() {
  const [messages, setMessages] = useState([
    {
      name: "Kakashi Hatake",
      message: "Selamat menempuh hidup baru. Semoga bahagia selalu.",
    },
    {
      name: "Sakura Haruno",
      message: "Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newMessage = {
      name: form.name,
      message: form.message,
    };

    setMessages([newMessage, ...messages]);

    setForm({
      name: "",
      message: "",
    });
  };

  return (
    <section className="h-screen px-6 py-6 max-w-4xl mx-auto flex flex-col justify-center">
      <div className="text-center mb-10">
        <p className="uppercase tracking-[0.3em] text-sm text-[#A77C45] mb-3">
          Doa & Ucapan
        </p>

        <h2 className="text-3xl md:text-4xl font-serif">
          Ucapan Tamu
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-md p-6 space-y-5 mb-10"
      >
        <div>
          <label className="block mb-2 font-semibold">Nama</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-[#D8C7B0] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A46A]"
            placeholder="Nama Anda"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Ucapan</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border border-[#D8C7B0] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A46A]"
            placeholder="Tulis ucapan dan doa..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#3B2F2F] text-white py-3 rounded-full font-semibold hover:bg-[#5A463C] transition"
        >
          Kirim Ucapan
        </button>
      </form>

      <div className="space-y-3 max-h-56 overflow-hidden">
        {messages.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl shadow p-5">
            <h3 className="font-semibold mb-2">{item.name}</h3>
            <p className="text-[#5B4A42]">{item.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default GuestBook;