
import { useState } from "react";
import { weddingData } from "../data/weddingData.js";

export default function GiftSlide() {
  const [copied, setCopied] = useState(null);

  const handleCopy = async (number, type) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopied(type);
    } catch (error) {
      console.error("Gagal menyalin nomor:", error);
      setCopied(null);
    }
  };

  return (
    <section className="gift-slide">
      <div className="gift-inner">
        <header className="gift-heading">
          <span>A TOKEN OF LOVE</span>

          <h1>Wedding Gift</h1>

          <p>
            Doa dan restu Anda adalah hadiah
            terindah bagi kami.
          </p>
        </header>

        <div className="gift-list">
          {weddingData.gifts.map((gift) => (
            <article className="gift-card" key={gift.type}>
              <div className="gift-card-info">
                <span className="gift-label">
                  {["BCA", "SeaBank"].includes(gift.type)
                    ? "NOMOR REKENING"
                    : "NOMOR"}
                </span>

                <strong className="gift-number">
                  {gift.number}
                </strong>

                <div className="gift-owner">
                  <span>ATAS NAMA</span>
                  <strong>{gift.name}</strong>
                </div>
              </div>

              <div className="gift-card-actions">
                <img
                  src={gift.logo}
                  alt={`Logo ${gift.type}`}
                  className="gift-logo"
                />

                <button
                  type="button"
                  className="gift-copy-button"
                  onClick={() => handleCopy(gift.number, gift.type)}
                  aria-label={`Salin nomor ${gift.type}`}
                >
                  {copied === gift.type ? "✓ Tersalin" : "Salin"}
                </button>
              </div>
            </article>

          ))}
        </div>

        <p className="gift-closing">
          Terima kasih atas segala doa,
          perhatian, dan kasih sayang Anda.
        </p>
      </div>
    </section>
  );
}
