"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white rounded-b-3xl shadow-sm px-6 md:px-16 py-5 flex items-center justify-between relative z-50">
      <Link href="/" className="text-2xl font-extrabold text-deep-purple">
        Kennou<span className="text-coral">.</span>
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-10">
        <li>
          <Link href="/dashboard" className="text-gray-600 font-medium hover:text-deep-purple transition-colors">
            Programme
          </Link>
        </li>
        <li>
          <Link href="/success-stories" className="text-gray-600 font-medium hover:text-deep-purple transition-colors">
            Success Stories
          </Link>
        </li>
        <li>
          <Link
            href="/apply"
            className="bg-gradient-to-br from-coral to-amber text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-coral/30 hover:-translate-y-0.5 transition-transform"
          >
            Apply Now
          </Link>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-deep-purple transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-deep-purple transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-deep-purple transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-white rounded-b-3xl shadow-lg p-6 flex flex-col gap-4 md:hidden">
          <Link href="/dashboard" className="text-gray-600 font-medium" onClick={() => setMobileOpen(false)}>
            Programme
          </Link>
          <Link href="/success-stories" className="text-gray-600 font-medium" onClick={() => setMobileOpen(false)}>
            Success Stories
          </Link>
          <Link
            href="/apply"
            className="bg-gradient-to-br from-coral to-amber text-white px-6 py-2.5 rounded-full font-bold text-center"
            onClick={() => setMobileOpen(false)}
          >
            Apply Now
          </Link>
        </div>
      )}
    </nav>
  );
}
