import { weddingData } from "../data/weddingData.js";

function CoupleCard({ person, label }) {
  return (
    <article className="person">
      <img className="person-photo" src={person.image} alt={person.name} />
      <small>{label}</small>
      <h3>{person.name}</h3>
      <p>Anak kedua dari</p>
      <p>{person.father} &amp; {person.mother}</p>
      <p className="muted">{person.address}</p>
    </article>
  );
}

export default function OpeningSlide() {
  return (
    <section className="opening-slide" aria-label="Pembuka dan profil mempelai">
      <div className="opening-top-decoration" aria-hidden="true" />
      <div className="opening-mihrab" aria-hidden="true">
        <div className="opening-lantern" />
        <div className="opening-kufi" />
      </div>
      <div className="opening-intro">
        <p>Assalamu'alaikum Wr. Wb.</p>
        <h1>Dua Hati, Satu Janji</h1>
        <p>Dengan rahmat dan ridha Allah SWT, kami mengundang Anda ke hari bahagia kami.</p>
      </div>
      <div className="people">
        <CoupleCard person={weddingData.groom} label="Mempelai Pria" />
        <CoupleCard person={weddingData.bride} label="Mempelai Wanita" />
      </div>
      <div className="opening-connector" aria-hidden="true" />
      <p className="opening-names">NANA &amp; MEYSA</p>
      <div className="opening-bottom-decoration" aria-hidden="true" />
    </section>
  );
}
