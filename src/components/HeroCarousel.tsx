"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const placements = [
  { name: "Amara K.", role: "Graduate Analyst", company: "HSBC", quote: "Kennou gave me structure when I had none.", img: "/avatars/avatar-1.jpg" },
  { name: "Jordan M.", role: "Ops Associate", company: "Deloitte", quote: "The confidence I built changed everything.", img: "/avatars/avatar-2.jpg" },
  { name: "Priya S.", role: "Junior Consultant", company: "Accenture", quote: "Kennou showed me I belonged in corporate.", img: "/avatars/avatar-3.jpg" },
  { name: "David W.", role: "Business Analyst", company: "PwC", quote: "From a council estate to PwC. Unreal.", img: "/avatars/avatar-4.jpg" },
  { name: "Safia H.", role: "Marketing Exec", company: "Unilever", quote: "Doors I didn't know existed opened up.", img: "/avatars/avatar-5.jpg" },
  { name: "Liam T.", role: "Tech Analyst", company: "KPMG", quote: "Two weeks that changed my whole trajectory.", img: "/avatars/avatar-6.jpg" },
];

function Card({ person, className }: { person: (typeof placements)[0]; className?: string }) {
  return (
    <div className={`absolute inset-0 bg-white rounded-3xl shadow-lg flex items-stretch overflow-hidden ${className ?? ""}`}>
      {/* Square photo */}
      <div className="relative w-[140px] shrink-0 bg-gradient-to-br from-coral-soft to-amber-soft">
        <Image src={person.img} alt={person.name} fill className="object-cover" sizes="140px" />
      </div>
      {/* Content */}
      <div className="flex-1 px-5 py-5 flex flex-col justify-center min-w-0">
        <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full self-start mb-2">Placed ✓</span>
        <p className="font-bold text-[15px] leading-tight">{person.name}</p>
        <p className="text-xs text-gray-500 mt-0.5">{person.role}</p>
        <p className="text-xs font-semibold text-coral">{person.company}</p>
        <p className="text-[13px] text-gray-400 italic mt-3 leading-relaxed">&ldquo;{person.quote}&rdquo;</p>
      </div>
    </div>
  );
}

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActive((i) => (i + 1) % placements.length);
        setFade(true);
      }, 300);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const curr = placements[active];
  const next1 = placements[(active + 1) % placements.length];
  const next2 = placements[(active + 2) % placements.length];

  return (
    <div className="relative w-full max-w-[420px] h-[180px]">
      {/* Back card (3rd) */}
      <div className="absolute inset-0 translate-x-4 translate-y-4 opacity-[0.15]">
        <Card person={next2} className="shadow-sm" />
      </div>
      {/* Middle card (2nd) */}
      <div className="absolute inset-0 translate-x-2 translate-y-2 opacity-30">
        <Card person={next1} className="shadow-md" />
      </div>
      {/* Front card (active) */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ opacity: fade ? 1 : 0 }}
      >
        <Card person={curr} />
      </div>
    </div>
  );
}
