import Link from "next/link";

export default function DashboardPage() {
  const modules = [
    { id: "emotional-intelligence", num: "01", title: "Emotional Intelligence", desc: "Understanding yourself and reading rooms.", videos: 3, progress: 100 },
    { id: "interview-mastery", num: "02", title: "Interview Mastery", desc: "Frameworks and practice that work.", videos: 4, progress: 75 },
    { id: "professional-networking", num: "03", title: "Professional Networking", desc: "Building genuine connections.", videos: 3, progress: 33 },
    { id: "communication-presence", num: "04", title: "Communication & Presence", desc: "Speaking clearly, owning the room.", videos: 3, progress: 0 },
    { id: "corporate-culture", num: "05", title: "Corporate Culture", desc: "The unwritten rules.", videos: 2, progress: 0 },
    { id: "personal-branding", num: "06", title: "Personal Branding", desc: "CV, LinkedIn, your story.", videos: 3, progress: 0 },
  ];

  const totalProgress = Math.round(modules.reduce((sum, m) => sum + m.progress, 0) / modules.length);
  const allComplete = totalProgress === 100;

  return (
    <div className="px-6 md:px-16 py-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">Your Programme</h1>
          <p className="text-gray-600">Complete all modules to unlock your interview booking.</p>
        </div>
        <Link
          href={allComplete ? "/dashboard/book-interview" : "#"}
          className={`px-6 py-3 rounded-full font-bold text-center transition-all ${
            allComplete
              ? "bg-gradient-to-br from-coral to-amber text-white shadow-lg shadow-coral/30 hover:-translate-y-0.5"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {allComplete ? "Book Your Interview" : "🔒 Complete all modules first"}
        </Link>
      </div>

      {/* Overall progress */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">Overall Progress</span>
          <span className="text-sm font-bold text-coral">{totalProgress}%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-coral to-amber rounded-full transition-all"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
      </div>

      {/* Module grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {modules.map((mod) => (
          <Link
            key={mod.id}
            href={`/dashboard/module/${mod.id}`}
            className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-transparent hover:border-coral hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex justify-between items-start mb-3">
              <p className="text-xs font-bold text-amber uppercase tracking-wide">Module {mod.num}</p>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                mod.progress === 100 ? "bg-green-100 text-green-700" :
                mod.progress > 0 ? "bg-amber-soft text-amber" :
                "bg-gray-100 text-gray-400"
              }`}>
                {mod.progress === 100 ? "✓ Done" : mod.progress > 0 ? `${mod.progress}%` : "Not started"}
              </span>
            </div>
            <h3 className="font-bold mb-1 group-hover:text-coral transition-colors">{mod.title}</h3>
            <p className="text-sm text-gray-600">{mod.desc}</p>
            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-coral to-amber rounded-full"
                style={{ width: `${mod.progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">{mod.videos} videos</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
