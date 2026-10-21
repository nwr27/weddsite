import "./WeddingLoader.css";

export default function WeddingLoader({ progress = 0, exiting = false }) {
  const percentage = Math.min(100, Math.max(0, Math.round(progress)));
  return (
    <div className={`wedding-loader ${exiting ? "wedding-loader--exit" : ""}`}
      role="status" aria-live="polite"
      aria-label={`Menyiapkan undangan ${percentage} persen`}>
      <div className="wedding-loader__content">
        <div className="wedding-loader__spinner"><span>N&M</span></div>
        <p className="wedding-loader__eyebrow">OUR WEDDING</p>
        <h2>Nana & Meysa</h2>
        <p className="wedding-loader__description">Menyiapkan momen istimewa kami...</p>
        <div className="wedding-loader__progress" role="progressbar"
          aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}>
          <div className="wedding-loader__progress-fill" style={{ width: `${percentage}%` }} />
        </div>
        <span className="wedding-loader__percentage">{percentage}%</span>
      </div>
    </div>
  );
}
