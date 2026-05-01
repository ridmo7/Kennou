"use client";

import { useEffect, useState } from "react";

const placements = [
  { initials: "AK", name: "Amara K.", role: "Graduate Analyst", company: "HSBC" },
  { initials: "JM", name: "Jordan M.", role: "Ops Associate", company: "Deloitte" },
  { initials: "PS", name: "Priya S.", role: "Junior Consultant", company: "Accenture" },
  { initials: "DW", name: "David W.", role: "Business Analyst", company: "PwC" },
  { initials: "SH", name: "Safia H.", role: "Marketing Exec", company: "Unilever" },
  { initials: "LT", name: "Liam T.", role: "Tech Analyst", company: "KPMG" },
  { initials: "NK", name: "Nadia K.", role: "HR Associate", company: "EY" },
  { initials: "CB", name: "Chris B.", role: "Finance Trainee", company: "Barclays" },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % placements.length), 3000);
    return () => clearInterval(id);
  }, []);

  const p = placements[active];
  const next = placements[(active + 1) % placements.length];
  const prev = placements[(active - 1 + placements.length) % placements.length];

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Single rotating card */}
      <div className="relative w-72 h-24">
        <div
          key={active}
          className="absolute inset-0 bg-white rounded-2xl px-5 py-4 shadow-sm flex items-center gap-4 animate-[fadeSlideIn_0.4s_ease-out]"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-coral to-amber rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
            {p.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-sm">{p.name}</p>
            <p className="text-xs text-gray-500">{p.role}</p>
            <p className="text-xs font-semibold text-coral">{p.company}</p>
          </div>
          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full shrink-0">Placed&nbsp;✓</span>
        </div>
      </div>

      {/* Peek: next up avatars */}
      <div className="flex items-center gap-2 opacity-50">
        <div className="w-7 h-7 bg-gradient-to-br from-amber to-coral rounded-full flex items-center justify-center text-white text-[9px] font-bold">{prev.initials}</div>
        <div className="w-1.5 h-1.5 rounded-full bg-coral" />
        <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
        <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
        <div className="w-7 h-7 bg-gradient-to-br from-coral to-amber rounded-full flex items-center justify-center text-white text-[9px] font-bold">{next.initials}</div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
