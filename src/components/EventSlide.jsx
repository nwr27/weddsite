import { weddingData } from "../data/weddingData.js";

export default function EventSlide() {
  const { event } = weddingData;

  return (
    <div className="event-slide">
      <div className="event-inner">
        <header className="event-heading">
          <span className="event-eyebrow">THE WEDDING CEREMONY</span>
          <h1>Akad <span>&amp;</span> Resepsi</h1>
          <p>{event.dateText}</p>
        </header>

        <div className="event-ceremonies">
          <article className="event-ceremony">
            <span className="event-ceremony-number">壱 · 01</span>
            <h2>Akad Nikah</h2>
            <strong>{event.akadTime}</strong>
          </article>
          <div className="event-ceremony-separator" aria-hidden="true">✦</div>
          <article className="event-ceremony">
            <span className="event-ceremony-number">弐 · 02</span>
            <h2>Resepsi</h2>
            <strong>{event.receptionTime}</strong>
          </article>
        </div>

        <footer className="event-location">
          <span>LOKASI ACARA</span>
          <h3>{event.place}</h3>
          <p>{event.address}</p>
          <a href={event.mapsUrl} target="_blank" rel="noopener noreferrer">Lihat Lokasi <span aria-hidden="true">↗</span></a>
        </footer>
      </div>
    </div>
  );
}
