"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { MODULES } from "@/lib/modules";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("kennou_progress");
    if (stored) setProgress(JSON.parse(stored));
  }, []);

  // Loading skeleton
  if (isLoading || !mounted) {
    return (
      <div className="px-6 md:px-16 py-16 max-w-7xl mx-auto">
        <div className="skeleton h-10 w-72 rounded-xl mb-3" />
        <div className="skeleton h-5 w-96 rounded-lg mb-10" />
        <div className="skeleton h-20 w-full rounded-2xl mb-8" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-44 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  // Auth gate
  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-coral-soft rounded-full flex items-center justify-center text-3xl mx-auto mb-6">🔒</div>
          <h1 className="text-2xl font-extrabold mb-3">You need to log in</h1>
          <p className="text-gray-600 mb-6">Sign in to access your programme and track your progress.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/login" className="bg-gradient-to-br from-coral to-amber text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-coral/30 hover:-translate-y-0.5 transition-transform">
              Log In
            </Link>
            <Link href="/apply" className="border-2 border-gray-200 text-deep-purple px-6 py-3 rounded-full font-bold hover:border-coral transition-colors">
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const firstName = user.name.split(" ")[0];

  // Calculate per-module progress from stored completed module IDs
  const moduleProgress = MODULES.map((mod) => {
    const completed = progress[mod.id] || false;
    return { ...mod, completed, progressPct: completed ? 100 : 0 };
  });

  // Sequential locking: module is unlocked if it's the first, or the previous one is completed
  const unlockedModules = moduleProgress.map((mod, i) => ({
    ...mod,
    unlocked: i === 0 || moduleProgress[i - 1].completed,
  }));

  const completedCount = unlockedModules.filter((m) => m.completed).length;
  const totalProgress = Math.round((completedCount / MODULES.length) * 100);
  const allComplete = completedCount === MODULES.length;

  // Countdown: 14 days from signup
  const signupDate = new Date(user.signupDate);
  const deadline = new Date(signupDate.getTime() + 14 * 24 * 60 * 60 * 1000);
  const now = new Date();
  const daysLeft = Math.max(0, Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="px-6 md:px-16 py-16 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-gray-600">Complete all modules to unlock your interview booking.</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Countdown */}
          <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm text-center">
            <p className={`text-2xl font-bold ${daysLeft <= 3 ? "text-red-500" : "text-coral"}`}>{daysLeft}</p>
            <p className="text-xs text-gray-400">days left</p>
          </div>
          <Link
            href={allComplete ? "/dashboard/book-interview" : "#"}
            className={`px-6 py-3 rounded-full font-bold text-center transition-all ${
              allComplete
                ? "bg-gradient-to-br from-coral to-amber text-white shadow-lg shadow-coral/30 hover:-translate-y-0.5"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            onClick={(e) => !allComplete && e.preventDefault()}
          >
            {allComplete ? "Book Your Interview →" : "🔒 Complete all modules first"}
          </Link>
        </div>
      </div>

      {/* Overall progress */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">Overall Progress</span>
          <span className="text-sm font-bold text-coral">{totalProgress}%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-coral to-amber rounded-full transition-all duration-500"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">{completedCount} of {MODULES.length} modules completed</p>
      </div>

      {/* Empty state prompt */}
      {completedCount === 0 && (
        <div className="bg-coral-soft/50 rounded-2xl p-6 mb-8 flex items-center gap-4">
          <span className="text-3xl">👇</span>
          <div>
            <p className="font-bold text-deep-purple">Start with Module 01</p>
            <p className="text-sm text-gray-600">Work through the modules in order. Each one builds on the last.</p>
          </div>
        </div>
      )}

      {/* Module grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {unlockedModules.map((mod) => (
          <div key={mod.id} className="relative">
            {!mod.unlocked && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] rounded-2xl z-10 flex items-center justify-center">
                <span className="text-2xl">🔒</span>
              </div>
            )}
            <Link
              href={mod.unlocked ? `/dashboard/module/${mod.id}` : "#"}
              className={`block bg-white p-6 rounded-2xl shadow-sm border-l-4 border-transparent transition-all group ${
                mod.unlocked ? "hover:border-coral hover:-translate-y-0.5" : "pointer-events-none"
              }`}
              onClick={(e) => !mod.unlocked && e.preventDefault()}
            >
              <div className="flex justify-between items-start mb-3">
                <p className="text-xs font-bold text-amber uppercase tracking-wide">Module {mod.num}</p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  mod.completed ? "bg-green-100 text-green-700" :
                  mod.unlocked ? "bg-amber-soft text-amber" :
                  "bg-gray-100 text-gray-400"
                }`}>
                  {mod.completed ? "✓ Done" : mod.unlocked ? "Start →" : "Locked"}
                </span>
              </div>
              <h3 className="font-bold mb-1 group-hover:text-coral transition-colors">{mod.title}</h3>
              <p className="text-sm text-gray-600">{mod.description.slice(0, 60)}...</p>
              <div className="w-full h-1.5 bg-gray-100 rounded-full mt-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-coral to-amber rounded-full transition-all duration-500"
                  style={{ width: `${mod.progressPct}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">{mod.videos.length} videos</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
