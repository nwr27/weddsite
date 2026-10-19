import { weddingData as data } from "../data/weddingData.js";

function Person({ person, label }) {
  return (
    <article className="person">
      <img className="person-photo" src={person.image} alt={person.name} />
      <small>{label}</small>
      <h3>{person.name}</h3>
      <p>Anak dari {person.father} &amp; {person.mother}</p>
      <p className="muted">{person.address}</p>
    </article>
  );
}

export default function SlideContent({ id }) {
  switch (id) {
    case "opening": return <>
      <p>Assalamu'alaikum Wr. Wb.</p>
      <h1>Dua Hati, Satu Janji</h1>
      <p>Dengan rahmat dan ridha Allah SWT, kami mengundang Anda ke hari bahagia kami.</p>
      <div className="people"><Person person={data.groom} label="Mempelai Pria" /><Person person={data.bride} label="Mempelai Wanita" /></div>
      <p>NANA &amp; MEYSA</p>
    </>;
    case "verse": return <><h1>Ayat Suci</h1><p>QS. Ar-Rum: 21</p><p>Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan pasangan-pasangan untukmu agar kamu merasa tenteram kepadanya.</p></>;
    case "countdown": return <><h1>Menuju Hari Bahagia</h1><p>{data.event.dateText}</p></>;
    case "event": return <><h1>Akad &amp; Resepsi</h1><p>{data.event.dateText}</p><p>Akad: {data.event.akadTime}</p><p>Resepsi: {data.event.receptionTime}</p><p>{data.event.place}, {data.event.address}</p></>;
    case "gallery": return <><h1>Galeri</h1><div className="gallery">{data.gallery.map((src) => <img key={src} src={src} alt="Galeri pasangan" loading="lazy" />)}</div></>;
    case "rsvp": return <><h1>Konfirmasi Kehadiran</h1></>;
    case "gift": return <><h1>Hadiah Pernikahan</h1></>;
    case "story": return <><h1>Kisah Kami</h1><div className="stack">{data.loveStory.map((item) => <article key={item.year}><strong>{item.year} · {item.title}</strong><p>{item.text}</p></article>)}</div></>;
    case "guestbook": return <><h1>Ucapan &amp; Doa</h1></>;
    case "closing": return <><h1>Terima Kasih</h1></>;
    default: return null;
  }
}
