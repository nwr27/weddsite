
const photos = [
  { src: "/images/gallery-1.jpg", alt: "Foto utama Nana dan Meysa" },
  { src: "/images/gallery-2.jpg", alt: "Momen kebersamaan Nana dan Meysa" },
  { src: "/images/gallery-3.jpg", alt: "Potret romantis Nana dan Meysa" },
];

export default function GallerySlide() {
  return (
    <section className="gallery-slide">
      <div className="gallery-inner">
        <header className="gallery-heading">
          <span>OUR PRECIOUS MOMENTS</span>
          <h1>Our Gallery</h1>
          <p>Every moment, a beautiful memory.</p>
        </header>

        <div className="gallery-photo-grid">
          {photos.map((photo, index) => (
            <figure
              className={`gallery-photo ${index === 0 ? "gallery-photo-main" : ""}`}
              key={photo.src}
            >
              <img src={photo.src} alt={photo.alt} loading="eager" decoding="async"  />
            </figure>
          ))}
        </div>

        <div className="gallery-signature" aria-hidden="true">
          ✦ N &amp; M ✦
        </div>
      </div>
    </section>
  );
}
