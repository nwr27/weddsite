
import { useState } from "react";
import { supabase } from "../lib/supabase.js";

export default function RSVPSlide() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("hadir");
  const [guestCount, setGuestCount] = useState("1");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    const guestName = name.trim();
    if (!guestName || submitting) return;

    setSubmitting(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("rsvp")
        .insert({
          guest_name: guestName,
          attendance,
          guest_count:
            attendance === "hadir"
              ? Number(guestCount)
              : 0,
        });

      if (error) throw error;

      setMessage("Konfirmasi kehadiran berhasil dikirim.");
      setName("");
      setAttendance("hadir");
      setGuestCount("1");

    } catch (error) {
      console.error("RSVP Supabase Error:", error);

      setMessage(
        `Gagal mengirim: ${error.message || "Kesalahan tidak diketahui"}`
      );
    } finally {
      setSubmitting(false);
    }

  };


  return (
    <section className="rsvp-content">
      <header className="rsvp-header">
        <p className="rsvp-eyebrow">
          THE HONOR OF YOUR PRESENCE
        </p>
        <h2>RSVP</h2>
        <p>Mohon konfirmasi kehadiran Anda</p>
      </header>

      <form className="rsvp-form" onSubmit={handleSubmit}>
        <label htmlFor="rsvp-name">Nama Tamu</label>
        <input
          id="rsvp-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Masukkan nama Anda"
          maxLength={100}
          required
        />

        <fieldset className="rsvp-attendance">
          <legend>Konfirmasi Kehadiran</legend>

          <label>
            <input
              type="radio"
              name="attendance"
              value="hadir"
              checked={attendance === "hadir"}
              onChange={() => setAttendance("hadir")}
            />
            Insya Allah Hadir
          </label>

          <label>
            <input
              type="radio"
              name="attendance"
              value="tidak_hadir"
              checked={attendance === "tidak_hadir"}
              onChange={() => setAttendance("tidak_hadir")}
            />
            Berhalangan Hadir
          </label>
        </fieldset>

        {attendance === "hadir" && (
          <>
            <label htmlFor="rsvp-count">Jumlah Tamu</label>
            <select
              id="rsvp-count"
              value={guestCount}
              onChange={(event) =>
                setGuestCount(event.target.value)
              }
            >
              <option value="1">1 Orang</option>
              <option value="2">2 Orang</option>
              <option value="3">3 Orang</option>
              <option value="4">4 Orang</option>
              <option value="5">5 Orang</option>
              <option value="6">6 Orang</option>
              <option value="7">7 Orang</option>
              <option value="8">8 Orang</option>
              <option value="9">9 Orang</option>
              <option value="10">10 Orang</option>
              <option value="11">11 Orang</option>
              <option value="12">12 Orang</option>
              <option value="13">13 Orang</option>
              <option value="14">14 Orang</option>
              <option value="15">15 Orang</option>
              <option value="16">16 Orang</option>
              <option value="17">17 Orang</option>
              <option value="18">18 Orang</option>
              <option value="19">19 Orang</option>
              <option value="20">20 Orang</option>
              <option value="21">21 Orang</option>
            </select>
          </>
        )}

        <button type="submit" disabled={submitting}>
          {submitting ? "Mengirim..." : "Kirim Konfirmasi"}
        </button>

        {message && (
          <p role="status" aria-live="polite">
            {message}
          </p>
        )}
      </form>

      <p className="rsvp-footer">
        Terima kasih atas doa dan kehadiran Anda.
      </p>
    </section>
  );
}
