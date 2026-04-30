export default function SuccessStoriesPage() {
  const stories = [
    { initials: "AK", name: "Amara K.", role: "Graduate Analyst — HSBC", quote: "Kennou gave me structure when I had none. I went from not knowing where to start to landing my dream role in 3 months.", bg: "from-coral to-amber" },
    { initials: "JM", name: "Jordan M.", role: "Operations Associate — Deloitte", quote: "The interview prep alone was worth it. But it was the confidence I built that really changed things for me.", bg: "from-amber to-coral" },
    { initials: "PS", name: "Priya S.", role: "Junior Consultant — Accenture", quote: "I didn't think corporate was for people like me. Kennou showed me I belonged there all along.", bg: "from-coral to-amber" },
    { initials: "DW", name: "David W.", role: "Business Analyst — PwC", quote: "Coming from a council estate, I never imagined I'd be where I am now. Kennou bridged that gap.", bg: "from-amber to-coral" },
    { initials: "SH", name: "Safia H.", role: "Marketing Executive — Unilever", quote: "The networking module opened doors I didn't even know existed. I'm now thriving in a role I love.", bg: "from-coral to-amber" },
    { initials: "LT", name: "Liam T.", role: "Technology Analyst — KPMG", quote: "Two weeks of work changed the trajectory of my entire career. Can't recommend this enough.", bg: "from-amber to-coral" },
  ];

  return (
    <div className="px-6 md:px-16 py-16 max-w-7xl mx-auto">
      <p className="text-sm uppercase tracking-widest text-coral font-bold mb-3">Real Results</p>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Success Stories</h1>
      <p className="text-gray-600 mb-12 text-lg max-w-2xl leading-relaxed">
        Real people. Real placements. These are the young people we&apos;ve helped get into meaningful corporate roles.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story.initials} className="bg-white p-6 rounded-2xl shadow-sm hover:-translate-y-1 transition-transform">
            <div className={`w-16 h-16 bg-gradient-to-br ${story.bg} rounded-full flex items-center justify-center text-white font-bold text-xl mb-4`}>
              {story.initials}
            </div>
            <h3 className="font-bold text-lg">{story.name}</h3>
            <p className="text-coral text-sm font-medium mb-3">{story.role}</p>
            <p className="text-gray-600 text-sm italic leading-relaxed">&ldquo;{story.quote}&rdquo;</p>
          </div>
        ))}
      </div>
    </div>
  );
}
