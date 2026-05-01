import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 md:px-16 py-16 md:py-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <span className="inline-block bg-coral-soft text-coral px-4 py-1.5 rounded-full text-sm font-bold mb-6 animate-fade-in-up">
            🎯 Free for eligible young people
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            Get corporate-ready.
            <br />
            <span className="bg-gradient-to-r from-coral to-amber bg-clip-text text-transparent">
              Get placed.
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mb-8 leading-relaxed">
            A structured employability programme for young people from disadvantaged backgrounds. Build real skills. Prove you&apos;re ready. We&apos;ll open the doors.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/apply"
              className="bg-gradient-to-br from-coral to-amber text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-coral/30 hover:-translate-y-0.5 transition-transform"
            >
              Check Your Eligibility
            </Link>
            <Link href="#how-it-works" className="font-semibold text-deep-purple px-4 py-4">
              How it works ↓
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center md:justify-end pt-4">
          <HeroCarousel />
        </div>
      </section>

      {/* How It Works */}
      <ScrollReveal>
        <section id="how-it-works" className="px-6 md:px-16 py-16 max-w-7xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-coral font-bold mb-3">The Process</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10">Three steps to your career</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "📋", title: "Apply & Qualify", desc: "Quick eligibility check based on your background. We're here for those who need it most." },
              { icon: "📚", title: "Learn & Build", desc: "Two weeks of focused development. Emotional intelligence, interview skills, networking — all the tools you need." },
              { icon: "🤝", title: "Present & Get Placed", desc: "Show us what you've learned. If you're ready, we connect you with our corporate partners directly." },
            ].map((step, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:-translate-y-1 transition-transform">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 ${
                  i === 0 ? "bg-coral-soft" : i === 1 ? "bg-blue-100" : "bg-green-100"
                }`}>
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Modules Preview */}
      <ScrollReveal>
        <section className="px-6 md:px-16 py-16 max-w-7xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-coral font-bold mb-3">Curriculum</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">What you&apos;ll learn</h2>
          <p className="text-gray-600 mb-10 text-lg">Practical skills designed by someone who&apos;s placed people into top firms.</p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { num: "01", title: "Emotional Intelligence", desc: "Understanding yourself and reading rooms in professional settings.", time: "3 videos • ~45 min" },
              { num: "02", title: "Interview Mastery", desc: "Frameworks, techniques, and practice that actually work.", time: "4 videos • ~60 min" },
              { num: "03", title: "Professional Networking", desc: "Building genuine connections without feeling fake.", time: "3 videos • ~40 min" },
              { num: "04", title: "Communication & Presence", desc: "Speaking clearly, presenting confidently, owning the room.", time: "3 videos • ~50 min" },
              { num: "05", title: "Corporate Culture", desc: "The unwritten rules nobody tells you about.", time: "2 videos • ~30 min" },
              { num: "06", title: "Personal Branding", desc: "Your CV, LinkedIn, and the story that makes people remember you.", time: "3 videos • ~45 min" },
            ].map((mod) => (
              <div key={mod.num} className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-transparent hover:border-coral hover:-translate-y-0.5 transition-all">
                <p className="text-xs font-bold text-amber uppercase tracking-wide mb-2">Module {mod.num}</p>
                <h3 className="font-bold mb-1">{mod.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{mod.desc}</p>
                <p className="text-xs text-gray-400 mt-3">⏱ {mod.time}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Success Stories Preview */}
      <ScrollReveal>
        <section className="bg-deep-purple text-white mx-4 md:mx-8 my-12 p-8 md:p-16 rounded-[32px]">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm uppercase tracking-widest text-amber-light font-bold mb-3">Real Results</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10">People we&apos;ve placed</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { initials: "AK", name: "Amara K.", role: "Graduate Analyst — HSBC", quote: "Kennou gave me structure when I had none. I went from not knowing where to start to landing my dream role in 3 months." },
                { initials: "JM", name: "Jordan M.", role: "Operations Associate — Deloitte", quote: "The interview prep alone was worth it. But it was the confidence I built that really changed things for me." },
                { initials: "PS", name: "Priya S.", role: "Junior Consultant — Accenture", quote: "I didn't think corporate was for people like me. Kennou showed me I belonged there all along." },
              ].map((story) => (
                <div key={story.initials} className="bg-white/5 backdrop-blur border border-white/10 p-6 rounded-2xl hover:bg-white/[0.08] transition-colors">
                  <div className="w-14 h-14 bg-gradient-to-br from-coral to-amber rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                    {story.initials}
                  </div>
                  <h4 className="font-bold text-lg">{story.name}</h4>
                  <p className="text-amber-light text-sm font-medium mb-3">{story.role}</p>
                  <p className="text-white/60 text-sm italic leading-relaxed">&ldquo;{story.quote}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className="px-6 md:px-16 py-20 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Ready to invest in yourself?</h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            It takes two weeks of focus. If you&apos;re serious about your future, this is where it starts.
          </p>
          <Link
            href="/apply"
            className="bg-gradient-to-br from-coral to-amber text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-coral/30 hover:-translate-y-0.5 transition-transform"
          >
            Apply Now — It&apos;s Free
          </Link>
        </section>
      </ScrollReveal>
    </>
  );
}
