import { weddingData } from "../data/weddingData.js";

function CoupleCard({ person, label }) {
  return (
    <article className="person">
      <div className="person-photo-wrapper">
        <img
          className="person-photo"
          src={person.image}
          alt={person.name}
        />

        <img
          className="person-photo-frame"
          src="/decorations/portrait-frame.png"
          alt=""
          aria-hidden="true"
        />
      </div>
      <small>{label}</small>
      <h3>
        {person.name === "Nana Wartana" ? (
          <>
            Nana
            <br />
            Wartana
          </>
        ) : (
          person.name
        )}
      </h3>
      <p>{person.name === "Nana Wartana" ? (
        <>
          Putra dari {person.father} &amp; {person.mother}
        </>
      ) : (
        <>
          Putri dari {person.father} &amp; <br />{person.mother}
        </>
      )}</p>
      <p className="muted">{person.name === "Nana Wartana" ? (
        <>
          Dusun Cisahang,<br />Desa Mekarmulya, Kec. Kertajati,<br />Kab. Majalengka
        </>
      ) : (
        <>
          Dusun Caricangkas,<br />Desa Karyamukti, Kec. Tomo,<br />Kab. Sumedang
        </>
      )}</p>
    </article>
  );
}

export default function OpeningSlide() {
  return (
    <section className="opening-slide" aria-label="Pembuka dan profil mempelai">
      <div className="opening-top-decoration" aria-hidden="true" />
      <div className="opening-kufi">
        <img
          src="/decorations/kufi-bismillah.png"
          alt="Bismillahirrahmanirrahim"
        />
      </div>
      <div className="opening-intro">
        <p>Assalamu'alaikum Wr. Wb.</p>
        <h1>Dua Hati, Satu Janji</h1>
        <p>Dengan rahmat dan ridha Allah SWT, kami mengundang Anda ke hari bahagia kami.</p>
      </div>
      <div className="people">
        <CoupleCard person={weddingData.groom} label="Mempelai Pria" />
        <CoupleCard person={weddingData.bride} label="Mempelai Wanita" />

        <img
          className="heart-ampersand"
          src="/decorations/heart-ampersand.png"
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className="opening-connector" aria-hidden="true" />
      <p className="opening-names">NANA &amp; MEYSA</p>
      <div className="opening-bottom-decoration" aria-hidden="true" />
    </section>
  );
}
