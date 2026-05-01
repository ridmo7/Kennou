"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="px-6 md:px-16 pt-20 pb-14 max-w-4xl mx-auto text-center">
        <p className="text-sm uppercase tracking-widest text-coral font-bold mb-3">About Us</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          We believe talent is everywhere.{" "}
          <span className="text-coral">Opportunity isn&apos;t.</span>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
          Kennou exists to close the gap between potential and placement for young people in the UK&apos;s most
          underserved communities.
        </p>
      </section>

      {/* Mission */}
      <ScrollReveal>
        <section className="px-6 md:px-16 py-14 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="bg-gradient-to-br from-coral/10 to-amber/10 rounded-3xl p-10 flex items-center justify-center">
              <span className="text-7xl">🌍</span>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Kennou is a structured, two-week employability programme that takes young people from disadvantaged
                socio-economic backgrounds and gives them the skills, confidence, and connections they need to land
                meaningful corporate roles.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We focus on the people who traditional career services overlook — those eligible for free school
                meals, living in the most deprived areas, and from low-income households.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* How it works */}
      <ScrollReveal>
        <section className="px-6 md:px-16 py-14 max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "📝", title: "Apply & Verify", desc: "Complete the eligibility form. We check deprivation data, FSM status, and household income." },
              { icon: "🎓", title: "Complete Modules", desc: "Work through 6 structured modules on CV building, interview prep, networking, and more." },
              { icon: "💼", title: "Get Placed", desc: "Book your final interview, present your learning, and get connected with corporate employers." },
            ].map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm text-center hover:-translate-y-1 transition-transform">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Values */}
      <ScrollReveal>
        <section className="px-6 md:px-16 py-14 max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold mb-8 text-center">Our Values</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: "Equity over Equality", desc: "We don't give the same thing to everyone — we give more to those who need it most." },
              { title: "Empowerment", desc: "We don't place people in roles. We teach them to place themselves." },
              { title: "Transparency", desc: "Clear eligibility criteria, open processes, and no hidden costs." },
              { title: "Real-World Relevance", desc: "Every module, every lesson, every skill maps directly to what employers actually want." },
            ].map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold mb-1">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className="px-6 md:px-16 py-20 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-extrabold mb-3">Ready to change your story?</h2>
            <p className="text-gray-600 mb-6">
              Check your eligibility in under two minutes.
            </p>
            <a
              href="/apply"
              className="inline-block bg-gradient-to-br from-coral to-amber text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-coral/30 hover:-translate-y-0.5 transition-transform"
            >
              Apply Now
            </a>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
