"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  const navLinkClass = (path: string) =>
    `font-medium transition-colors ${
      isActive(path)
        ? "text-coral"
        : "text-gray-600 hover:text-deep-purple"
    }`;

  return (
    <nav className="bg-white rounded-b-3xl shadow-sm px-6 md:px-16 py-5 flex items-center justify-between relative z-50">
      <Link href="/" className="text-2xl font-extrabold text-deep-purple">
        Kennou<span className="text-coral">.</span>
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-8">
        {user && (
          <li>
            <Link href="/dashboard" className={navLinkClass("/dashboard")}>
              My Programme
            </Link>
          </li>
        )}
        <li>
          <Link href="/success-stories" className={navLinkClass("/success-stories")}>
            Success Stories
          </Link>
        </li>
        <li>
          <Link href="/about" className={navLinkClass("/about")}>
            About
          </Link>
        </li>

        {user ? (
          <>
            <li className="flex items-center gap-3 ml-2">
              <div className="w-9 h-9 bg-gradient-to-br from-coral to-amber rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
              </div>
              <button
                onClick={logout}
                className="text-sm text-gray-400 hover:text-red-500 font-medium transition-colors"
              >
                Log out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login" className={navLinkClass("/login")}>
                Log in
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
          </>
        )}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-deep-purple transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-deep-purple transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-deep-purple transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-white rounded-b-3xl shadow-lg p-6 flex flex-col gap-4 md:hidden animate-fade-in">
          {user && (
            <Link href="/dashboard" className={navLinkClass("/dashboard")} onClick={() => setMobileOpen(false)}>
              My Programme
            </Link>
          )}
          <Link href="/success-stories" className={navLinkClass("/success-stories")} onClick={() => setMobileOpen(false)}>
            Success Stories
          </Link>
          <Link href="/about" className={navLinkClass("/about")} onClick={() => setMobileOpen(false)}>
            About
          </Link>
          {user ? (
            <button
              onClick={() => { logout(); setMobileOpen(false); }}
              className="text-left text-gray-600 font-medium hover:text-red-500"
            >
              Log out ({user.name.split(" ")[0]})
            </button>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 font-medium" onClick={() => setMobileOpen(false)}>
                Log in
              </Link>
              <Link
                href="/apply"
                className="bg-gradient-to-br from-coral to-amber text-white px-6 py-2.5 rounded-full font-bold text-center"
                onClick={() => setMobileOpen(false)}
              >
                Apply Now
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
