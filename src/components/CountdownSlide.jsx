
import { useEffect, useState } from "react";
import { weddingData } from "../data/weddingData.js";

function getRemainingTime() {
  const target = new Date(
    `${weddingData.event.date.slice(0, 10)}T08:00:00+07:00`
  ).getTime();

  const difference = Math.max(0, target - Date.now());

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function CountdownSlide() {
  const [remaining, setRemaining] = useState(getRemainingTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(getRemainingTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Hari", value: remaining.days },
    { label: "Jam", value: remaining.hours },
    { label: "Menit", value: remaining.minutes },
    { label: "Detik", value: remaining.seconds },
  ];

  return (
    <section className="countdown-slide">
      <div className="countdown-heading">
        <span>THE WEDDING OF</span>
        <h1>Nana &amp; Meysa</h1>
        <p>Menuju Hari Bahagia</p>
      </div>

      <div className="countdown-timer">
        {units.map(({ label, value }) => (
          <div className="countdown-unit" key={label}>
            <strong>{String(value).padStart(2, "0")}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <p className="countdown-message">
        Menghitung setiap detik menuju janji suci
      </p>
    </section>
  );
}
