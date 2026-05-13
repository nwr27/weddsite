import { useEffect, useState } from "react";
import { weddingData } from "../data/weddingData";

function Countdown() {
  const calculateTimeLeft = () => {
    const targetDate = new Date(weddingData.event.date).getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / (1000 * 60)) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="h-screen px-6 py-10 bg-[#EFE3D0] text-center flex flex-col justify-center">
      <p className="uppercase tracking-[0.3em] text-sm text-[#A77C45] mb-3">
        Menuju Hari Bahagia
      </p>

      <h2 className="text-3xl md:text-4xl font-serif mb-10">
        Hitung Mundur Acara
      </h2>

      <div className="grid grid-cols-4 gap-3 max-w-xl mx-auto">
        <TimeBox number={timeLeft.days} label="Hari" />
        <TimeBox number={timeLeft.hours} label="Jam" />
        <TimeBox number={timeLeft.minutes} label="Menit" />
        <TimeBox number={timeLeft.seconds} label="Detik" />
      </div>
    </section>
  );
}

function TimeBox({ number, label }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <div className="text-2xl md:text-4xl font-bold">{number}</div>
      <div className="text-xs md:text-sm text-[#7A675B]">{label}</div>
    </div>
  );
}

export default Countdown;