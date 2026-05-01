"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const placements = [
  { name: "Amara K.", role: "Graduate Analyst", company: "HSBC", quote: "Kennou gave me structure when I had none. I went from lost to landed.", img: "/avatars/avatar-1.jpg" },
  { name: "Jordan M.", role: "Ops Associate", company: "Deloitte", quote: "The confidence I built here changed everything about how I show up.", img: "/avatars/avatar-2.jpg" },
  { name: "Priya S.", role: "Junior Consultant", company: "Accenture", quote: "I never thought corporate was for someone like me. Kennou proved me wrong.", img: "/avatars/avatar-3.jpg" },
  { name: "David W.", role: "Business Analyst", company: "PwC", quote: "From a council estate to PwC in three months. Still doesn't feel real.", img: "/avatars/avatar-4.jpg" },
  { name: "Safia H.", role: "Marketing Exec", company: "Unilever", quote: "Doors I didn't even know existed started opening up for me.", img: "/avatars/avatar-5.jpg" },
  { name: "Liam T.", role: "Tech Analyst", company: "KPMG", quote: "Two weeks of work changed the entire trajectory of my career.", img: "/avatars/avatar-6.jpg" },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");

  const goNext = useCallback(() => {
    if (sliding) return;
    setDirection("left");
    setSliding(true);
    setTimeout(() => {
      setCurrent((i) => (i + 1) % placements.length);
      setSliding(false);
    }, 500);
  }, [sliding]);

  useEffect(() => {
    const id = setInterval(goNext, 5000);
    return () => clearInterval(id);
  }, [goNext]);

  const goTo = (i: number) => {
    if (sliding || i === current) return;
    setDirection(i > current ? "left" : "right");
    setSliding(true);
    setTimeout(() => {
      setCurrent(i);
      setSliding(false);
    }, 500);
  };

  const p = placements[current];

  const slideClass = sliding
    ? direction === "left"
      ? "translate-x-[-40px] opacity-0"
      : "translate-x-[40px] opacity-0"
    : "translate-x-0 opacity-100";

  return (
    <div className="w-full max-w-[520px]">
      <div className={`bg-white rounded-3xl shadow-md overflow-hidden transition-all duration-500 ease-out ${slideClass}`}>
        <div className="flex items-stretch min-h-[260px]">
          {/* Photo */}
          <div className="relative w-[180px] shrink-0 bg-gradient-to-br from-coral-soft to-amber-soft">
            <Image
              src={p.img}
              alt={p.name}
              fill
              className="object-cover"
              sizes="180px"
              priority
            />
          </div>

          {/* Content — quote-led */}
          <div className="flex-1 px-7 py-6 flex flex-col justify-center">
            <p className="text-[17px] text-deep-purple font-medium leading-relaxed mb-5">
              &ldquo;{p.quote}&rdquo;
            </p>
            <div>
              <p className="font-bold text-[15px]">{p.name}</p>
              <p className="text-sm text-gray-500">
                {p.role} <span className="text-coral font-semibold">@ {p.company}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {placements.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to placement ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2 bg-coral"
                : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
