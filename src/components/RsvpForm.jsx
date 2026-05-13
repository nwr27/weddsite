import { useState } from "react";

function RsvpForm() {
  const [form, setForm] = useState({
    name: "",
    attendance: "hadir",
    guestCount: 1,
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

    alert(
      `RSVP dummy terkirim:\n\nNama: ${form.name}\nKehadiran: ${form.attendance}\nJumlah: ${form.guestCount}\nPesan: ${form.message}`
    );

    setForm({
      name: "",
      attendance: "hadir",
      guestCount: 1,
      message: "",
    });
  };

  return (
    <section className="h-screen px-6 py-6 max-w-3xl mx-auto flex flex-col justify-center">
      <div className="text-center mb-10">
        <p className="uppercase tracking-[0.3em] text-sm text-[#A77C45] mb-3">
          Konfirmasi Kehadiran
        </p>

        <h2 className="text-3xl md:text-4xl font-serif">
          RSVP
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-md p-5 space-y-3"
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
            placeholder="Masukkan nama Anda"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Kehadiran</label>
          <select
            name="attendance"
            value={form.attendance}
            onChange={handleChange}
            className="w-full border border-[#D8C7B0] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A46A]"
          >
            <option value="hadir">Hadir</option>
            <option value="tidak_hadir">Tidak Hadir</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Jumlah Tamu</label>
          <input
            type="number"
            name="guestCount"
            min="0"
            value={form.guestCount}
            onChange={handleChange}
            className="w-full border border-[#D8C7B0] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A46A]"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Pesan</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="3"
            className="w-full border border-[#D8C7B0] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A46A]"
            placeholder="Tulis pesan singkat..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#3B2F2F] text-white py-3 rounded-full font-semibold hover:bg-[#5A463C] transition"
        >
          Kirim RSVP
        </button>
      </form>
    </section>
  );
}

export default RsvpForm;