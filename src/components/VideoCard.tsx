"use client";

import { useState } from "react";

export function VideoModal({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 modal-overlay" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>

        {/* Fake video area */}
        <div className="w-full aspect-video bg-gradient-to-br from-deep-purple to-purple-light rounded-2xl flex flex-col items-center justify-center mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-3xl ml-1">▶</span>
          </div>
          <p className="text-white/80 text-sm font-medium">Video content coming soon</p>
        </div>

        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-600">This video will be available when the programme launches. Check back soon.</p>
      </div>
    </div>
  );
}

export function VideoCard({
  title,
  duration,
  completed,
  locked,
  onToggleComplete,
}: {
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  onToggleComplete: () => void;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={`bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4 transition-opacity ${locked ? "opacity-50 pointer-events-none" : ""}`}>
        {/* Thumbnail */}
        <button
          onClick={() => !locked && setShowModal(true)}
          className="w-32 h-20 bg-gradient-to-br from-deep-purple to-purple-light rounded-xl flex items-center justify-center shrink-0 group cursor-pointer"
        >
          <span className="text-white text-2xl group-hover:scale-110 transition-transform">▶</span>
        </button>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold truncate">{title}</h3>
          <p className="text-sm text-gray-400">{duration}</p>
        </div>
        <button
          onClick={onToggleComplete}
          className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-all cursor-pointer ${
            completed
              ? "bg-gradient-to-br from-coral to-amber border-transparent text-white"
              : "border-gray-200 hover:border-coral"
          }`}
          title={completed ? "Completed" : "Mark as watched"}
        >
          {completed && <span className="text-xs">✓</span>}
        </button>
      </div>

      {showModal && <VideoModal title={title} onClose={() => setShowModal(false)} />}
    </>
  );
}
