"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const placements = [
  { initials: "AK", name: "Amara K.", role: "Graduate Analyst", company: "HSBC", quote: "Kennou gave me structure when I had none.", img: "/avatars/avatar-1.jpg" },
  { initials: "JM", name: "Jordan M.", role: "Ops Associate", company: "Deloitte", quote: "The confidence I built changed everything.", img: "/avatars/avatar-2.jpg" },
  { initials: "PS", name: "Priya S.", role: "Junior Consultant", company: "Accenture", quote: "Kennou showed me I belonged in corporate.", img: "/avatars/avatar-3.jpg" },
  { initials: "DW", name: "David W.", role: "Business Analyst", company: "PwC", quote: "From a council estate to PwC. Unreal.", img: "/avatars/avatar-4.jpg" },
  { initials: "SH", name: "Safia H.", role: "Marketing Exec", company: "Unilever", quote: "Doors I didn't know existed opened up.", img: "/avatars/avatar-5.jpg" },
  { initials: "LT", name: "Liam T.", role: "Tech Analyst", company: "KPMG", quote: "Two weeks that changed my whole trajectory.", img: "/avatars/avatar-6.jpg" },
];

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

  const p = placements[active];

  return (
    <div className="w-full max-w-[340px]">
      {/* Featured profile card */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden transition-opacity duration-300" style={{ opacity: fade ? 1 : 0 }}>
        {/* Photo */}
        <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-coral-soft to-amber-soft">
          <Image
            src={p.img}
            alt={p.name}
            fill
            className="object-cover"
            sizes="340px"
          />
          <div className="absolute top-3 right-3">
            <span className="text-xs font-bold text-green-700 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">Placed ✓</span>
          </div>
        </div>

        {/* Info */}
        <div className="px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-bold text-base">{p.name}</p>
              <p className="text-sm text-gray-500">{p.role}</p>
              <p className="text-sm font-semibold text-coral">{p.company}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic mt-3 leading-relaxed">&ldquo;{p.quote}&rdquo;</p>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {placements.map((person, i) => (
          <button
            key={person.initials}
            onClick={() => { setFade(false); setTimeout(() => { setActive(i); setFade(true); }, 200); }}
            className={`relative w-9 h-9 rounded-full overflow-hidden transition-all duration-300 ${
              i === active ? "ring-2 ring-coral ring-offset-2 scale-110" : "opacity-50 hover:opacity-80"
            }`}
          >
            <Image src={person.img} alt={person.name} fill className="object-cover" sizes="36px" />
          </button>
        ))}
      </div>
    </div>
  );
}
