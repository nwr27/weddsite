import { weddingData } from "../data/weddingData";

const DECOR = "/decorations/";

function Ornament({ file, className = "", alt = "" }) {
  return <img src={`${DECOR}${file}`} alt={alt} aria-hidden={!alt} className={`gold-asset ${className}`} onError={(e) => { e.currentTarget.style.display = "none"; }} />;
}

function PersonCard({ person, isBride }) {
  const [first, ...rest] = person.name.split(" ");
  return (
    <article className={`gold-person ${isBride ? "gold-person-bride" : ""}`}>
      <div className="gold-portrait">
        <img className="gold-photo" src={person.image} alt={`Foto ${person.name}`} />
        <Ornament file="portrait-frame.png" className="gold-portrait-border" />
      </div>
      <span className="gold-role">{isBride ? "MEMPELAI WANITA" : "MEMPELAI PRIA"}</span>
      <h3 className="gold-name"><span>{first}</span><span>{rest.join(" ")}</span></h3>
      <Ornament file="gold-divider.png" className="gold-mini-divider" />
      <p className="gold-parent">Anak dari<br/><strong>{person.father} &amp; {person.mother}</strong></p>
      <div className="gold-address"><span>{person.address}</span></div>
    </article>
  );
}

export default function CoupleProfile() {
  const { groom, bride } = weddingData;
  return (
    <section id="profil" className="gold-page">
      <Ornament file="floral-corner.png" className="gold-corner gold-corner-left" />
      <Ornament file="floral-corner.png" className="gold-corner gold-corner-right" />
      <Ornament file="islamic-pendant.png" className="gold-pendant" />
      <Ornament file="mihrab-arch.png" className="gold-mihrab" />
      <div className="gold-content">
        <header className="gold-header">
          <Ornament file="kufi-bismillah.png" className="gold-kufi" alt="Kaligrafi Bismillah" />
          <p className="gold-salam">Assalamu’alaikum Wr. Wb.</p>
          <h2>Dua Hati, Satu Janji</h2>
          <p className="gold-intro">Dengan rahmat dan ridha Allah SWT, kami mengundang Anda ke hari bahagia kami.</p>
        </header>
        <div className="gold-cards">
          <PersonCard person={groom} isBride={false} />
          <Ornament file="heart-ampersand.png" className="gold-heart" alt="Nana dan Meysa" />
          <PersonCard person={bride} isBride={true} />
        </div>
        <div className="gold-signature">NANA &amp; MEYSA</div>
      </div>
      <Ornament file="floral-bottom.png" className="gold-floral-bottom" />
    </section>
  );
}
