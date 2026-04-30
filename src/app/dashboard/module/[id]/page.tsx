import Link from "next/link";

const modules: Record<string, { num: string; title: string; description: string; videos: { title: string; duration: string }[] }> = {
  "emotional-intelligence": {
    num: "01",
    title: "Emotional Intelligence",
    description: "Understanding yourself and others in professional settings. Learn how to read rooms, manage your reactions, and build empathy in the workplace.",
    videos: [
      { title: "What is Emotional Intelligence?", duration: "15:30" },
      { title: "Self-Awareness in Professional Settings", duration: "14:20" },
      { title: "Managing Emotions Under Pressure", duration: "16:45" },
    ],
  },
  "interview-mastery": {
    num: "02",
    title: "Interview Mastery",
    description: "Frameworks, techniques, and structured practice that will genuinely prepare you for corporate interviews at top firms.",
    videos: [
      { title: "The STAR Method Deep Dive", duration: "18:00" },
      { title: "Competency-Based Questions", duration: "15:45" },
      { title: "Strengths-Based Interviews", duration: "14:30" },
      { title: "How to Close an Interview", duration: "12:00" },
    ],
  },
  "professional-networking": {
    num: "03",
    title: "Professional Networking",
    description: "Building genuine connections without feeling fake. Learn how to approach people, follow up, and create real professional relationships.",
    videos: [
      { title: "Networking is Not What You Think", duration: "13:20" },
      { title: "How to Approach Anyone", duration: "14:50" },
      { title: "Following Up & Staying Connected", duration: "12:10" },
    ],
  },
  "communication-presence": {
    num: "04",
    title: "Communication & Presence",
    description: "Speaking clearly, presenting confidently, and owning the room — whether it's a meeting, a presentation, or a casual conversation.",
    videos: [
      { title: "Finding Your Professional Voice", duration: "15:00" },
      { title: "Presentation Skills Crash Course", duration: "18:30" },
      { title: "Active Listening & Asking Questions", duration: "13:45" },
    ],
  },
  "corporate-culture": {
    num: "05",
    title: "Corporate Culture",
    description: "The unwritten rules nobody tells you about. Understand office dynamics, hierarchies, and how to navigate them authentically.",
    videos: [
      { title: "Unspoken Rules of Corporate Life", duration: "16:20" },
      { title: "Managing Up & Building Relationships", duration: "14:40" },
    ],
  },
  "personal-branding": {
    num: "06",
    title: "Personal Branding",
    description: "Your CV, LinkedIn presence, and the story that makes people remember you. Craft a narrative that opens doors.",
    videos: [
      { title: "CV That Gets Past the Filter", duration: "15:10" },
      { title: "LinkedIn: Your Digital First Impression", duration: "13:50" },
      { title: "Telling Your Story Authentically", duration: "16:00" },
    ],
  },
};

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mod = modules[id];

  if (!mod) {
    return (
      <div className="px-6 md:px-16 py-16 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Module not found</h1>
        <Link href="/dashboard" className="text-coral font-semibold">← Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 py-16 max-w-4xl mx-auto">
      <Link href="/dashboard" className="text-sm text-gray-400 hover:text-coral transition-colors mb-6 inline-block">
        ← Back to Programme
      </Link>

      <p className="text-xs font-bold text-amber uppercase tracking-wide mb-2">Module {mod.num}</p>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">{mod.title}</h1>
      <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-2xl">{mod.description}</p>

      {/* Video list */}
      <div className="space-y-4">
        {mod.videos.map((video, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
            {/* Placeholder video thumbnail */}
            <div className="w-32 h-20 bg-gradient-to-br from-deep-purple to-purple-light rounded-xl flex items-center justify-center shrink-0">
              <span className="text-white text-2xl">▶</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{video.title}</h3>
              <p className="text-sm text-gray-400">{video.duration}</p>
            </div>
            <div className="w-5 h-5 rounded-full border-2 border-gray-200 shrink-0" title="Not completed" />
          </div>
        ))}
      </div>

      {/* Mark Complete */}
      <button
        className="mt-8 w-full bg-gradient-to-br from-coral to-amber text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-coral/30 hover:-translate-y-0.5 transition-transform"
      >
        Mark Module as Complete ✓
      </button>
    </div>
  );
}
