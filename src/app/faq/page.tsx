"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const faqs = [
  {
    q: "Who is eligible for the Kennou programme?",
    a: "Kennou is designed for young people aged 16–30 from disadvantaged socio-economic backgrounds in the UK. Eligibility is based on Free School Meals status, Index of Multiple Deprivation (IMD), and household income.",
  },
  {
    q: "Is the programme really free?",
    a: "Yes, completely free. Kennou is funded to ensure that cost is never a barrier. There are no hidden fees at any point — from application to placement.",
  },
  {
    q: "How long does the programme take?",
    a: "The core programme runs over 14 days. You'll work through 6 modules at your own pace, each containing practical video content and exercises. After completing all modules, you'll book your final interview.",
  },
  {
    q: "What happens after I complete the modules?",
    a: "You'll upload a short presentation summarising your learning, then book a 30-minute interview with a Kennou assessor. If successful, we connect you with our employer partners for placement opportunities.",
  },
  {
    q: "What kind of roles do graduates get?",
    a: "Our graduates have gone into roles including Graduate Analyst (HSBC), Operations Associate (Deloitte), Junior Consultant (Accenture), Business Analyst (PwC), and Marketing Executive (Unilever), among others.",
  },
  {
    q: "Can I retake the programme if I don't pass the interview?",
    a: "Yes. If your first interview isn't successful, you'll receive detailed feedback and can rebook after reviewing the relevant modules.",
  },
  {
    q: "I'm not sure if I live in a deprived area. How do I check?",
    a: "Enter your postcode during the application. We cross-reference it against the UK government's Index of Multiple Deprivation data to determine your eligibility automatically.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="px-6 md:px-16 py-16 max-w-3xl mx-auto animate-fade-in">
      <p className="text-sm uppercase tracking-widest text-coral font-bold mb-3">Support</p>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Frequently Asked Questions</h1>
      <p className="text-gray-600 mb-10 text-lg leading-relaxed">
        Everything you need to know about Kennou and how the programme works.
      </p>

      <ScrollReveal>
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold pr-4">{faq.q}</span>
                  <span
                    className={`text-coral text-xl flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-60 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="px-6 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      {/* CTA */}
      <div className="text-center mt-14">
        <p className="text-gray-600 mb-4">Still have questions?</p>
        <a
          href="mailto:hello@kennou.org"
          className="inline-block bg-gradient-to-br from-coral to-amber text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-coral/30 hover:-translate-y-0.5 transition-transform"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
