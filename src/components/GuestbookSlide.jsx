
import { useState } from "react";

export default function GuestbookSlide() {
  const [guestName, setGuestName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Integrasi Supabase pada tahap berikutnya.
  };

  return (
    <section className="guestbook-slide">
      <div className="guestbook-chat">
        <header className="guestbook-header">
          <div className="guestbook-avatar">N&M</div>

          <div className="guestbook-group-info">
            <h2>Wedding Wishes</h2>
            <p>Nana &amp; Meysa • Ucapan dan Doa</p>
          </div>
        </header>

        <div className="guestbook-messages">
          <div className="guestbook-date">Today</div>

          <div className="guestbook-bubble">
            <span className="guestbook-sender">Alya</span>
            <p>
              MasyaAllah, selamat menempuh hidup baru!
              Semoga sakinah mawaddah warahmah 🤍
            </p>
            <time>19:05</time>
          </div>

          <div className="guestbook-bubble">
            <span className="guestbook-sender">Fajar</span>
            <p>
              Barakallahu lakuma. Semoga selalu
              diberikan kebahagiaan dan keberkahan ✨
            </p>
            <time>19:08</time>
          </div>
        </div>

        <form
          className="guestbook-composer"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={guestName}
            onChange={(event) =>
              setGuestName(event.target.value)
            }
            placeholder="Nama Anda"
            maxLength={50}
            required
          />

          <div className="guestbook-message-input">
            <textarea
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              placeholder="Tulis ucapan dan doa..."
              maxLength={500}
              rows={1}
              required
            />

            <button
              type="submit"
              disabled
              aria-label="Kirim ucapan"
            >
              ➤
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
