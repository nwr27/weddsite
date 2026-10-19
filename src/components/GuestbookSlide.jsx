
import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase.js";

export default function GuestbookSlide() {
  const [guestName, setGuestName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ownMessageIds, setOwnMessageIds] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    let active = true;

    async function loadMessages() {
      const { data, error } = await supabase
        .from("guestbook")
        .select("id, guest_name, message, created_at")
        .order("created_at", { ascending: true })
        .limit(100);

      if (!active) return;

      if (error) {
        setErrorMessage("Gagal memuat ucapan tamu.");
      } else {
        setMessages(data ?? []);
      }

      setLoading(false);
    }

    loadMessages();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [messages, loading]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = guestName.trim();
    const wish = message.trim();

    if (!name || !wish || submitting) return;

    setSubmitting(true);
    setErrorMessage("");

    try {

      const { data: sentMessage, error } = await supabase
        .from("guestbook")
        .insert({
          guest_name: name,
          message: wish,
        })
        .select("id")
        .single();

      if (error) throw error;

      setOwnMessageIds((current) => [
        ...current,
        sentMessage.id,
      ]);


      const { data, error: loadError } = await supabase
        .from("guestbook")
        .select("id, guest_name, message, created_at")
        .order("created_at", { ascending: true })
        .limit(100);

      if (loadError) throw loadError;

      setMessages(data ?? []);
      setMessage("");
    } catch (error) {
      console.error("Guestbook Supabase Error:", error);
      setErrorMessage(
        "Gagal mengirim ucapan. Silakan coba lagi."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (date) =>
    new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    }).format(new Date(date));

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
          <div className="guestbook-date">
            Ucapan &amp; Doa
          </div>

          {loading && (
            <p className="guestbook-info">
              Memuat ucapan...
            </p>
          )}

          {!loading && messages.length === 0 && (
            <p className="guestbook-info">
              Jadilah yang pertama mengirim doa 🤍
            </p>
          )}

          {messages.map((item) => (

            <div
              className={`guestbook-bubble ${ownMessageIds.includes(item.id)
                ? "guestbook-bubble-own"
                : ""
                }`}
              key={item.id}
            >

              <span className="guestbook-sender">
                {item.guest_name}
              </span>

              <p>{item.message}</p>

              <time dateTime={item.created_at}>
                {formatTime(item.created_at)}
              </time>
            </div>
          ))}

          <div ref={messagesEndRef} />
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
              disabled={submitting}
              aria-label="Kirim ucapan"
            >
              {submitting ? "…" : "➤"}
            </button>
          </div>

          {errorMessage && (
            <p className="guestbook-error" role="alert">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
