"use client";

export function HeroCarousel() {
  const placements = [
    { initials: "AK", name: "Amara K.", role: "Graduate Analyst", company: "HSBC", color: "from-coral to-amber" },
    { initials: "JM", name: "Jordan M.", role: "Operations Associate", company: "Deloitte", color: "from-amber to-coral" },
    { initials: "PS", name: "Priya S.", role: "Junior Consultant", company: "Accenture", color: "from-coral to-amber" },
    { initials: "DW", name: "David W.", role: "Business Analyst", company: "PwC", color: "from-amber to-coral" },
    { initials: "SH", name: "Safia H.", role: "Marketing Executive", company: "Unilever", color: "from-coral to-amber" },
    { initials: "LT", name: "Liam T.", role: "Technology Analyst", company: "KPMG", color: "from-amber to-coral" },
    { initials: "NK", name: "Nadia K.", role: "HR Associate", company: "EY", color: "from-coral to-amber" },
    { initials: "CB", name: "Chris B.", role: "Finance Trainee", company: "Barclays", color: "from-amber to-coral" },
  ];

  // Duplicate for seamless infinite scroll
  const items = [...placements, ...placements];

  return (
    <div className="w-full max-w-md md:max-w-lg overflow-hidden relative">
      {/* Gradient fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Vertical scrolling track */}
      <div className="flex flex-col gap-4 animate-carousel-vertical">
        {items.map((person, i) => (
          <div
            key={`${person.initials}-${i}`}
            className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4 shrink-0"
          >
            <div className={`w-14 h-14 bg-gradient-to-br ${person.color} rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0`}>
              {person.initials}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm truncate">{person.name}</p>
              <p className="text-xs text-gray-600 truncate">{person.role}</p>
              <p className="text-xs font-semibold text-coral truncate">{person.company}</p>
            </div>
            <div className="ml-auto shrink-0">
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Placed ✓</span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes carousel-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-carousel-vertical {
          animation: carousel-vertical 30s linear infinite;
        }
        .animate-carousel-vertical:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
