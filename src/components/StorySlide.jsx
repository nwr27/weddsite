
export default function StorySlide() {
  return (
    <section className="story-slide">
      <div className="story-inner">
        <header className="story-heading">
          <span>THE STORY OF US</span>
          <h1>Kisah Kami</h1>
        </header>

        <figure className="story-illustration">
          <img
            src="/images/our_story.png"
            alt="Ilustrasi perjalanan cinta Nana dan Meysa dari awal bertemu pada 2024 hingga persiapan pernikahan pada 2027"
            loading="eager"
            decoding="async"
          />
        </figure>
        <footer className="story-footer">
          <span className="story-ornament" aria-hidden="true">
            ✦
          </span>
          <strong>Nana &amp; Meysa</strong>
        </footer>
      </div>
    </section>
  );
}
