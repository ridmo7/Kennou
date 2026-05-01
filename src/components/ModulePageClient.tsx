"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { VideoCard } from "@/components/VideoCard";
import { MODULES, getModuleById } from "@/lib/modules";

export function ModulePageClient({ id }: { id: string }) {
  const { user, isLoading } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [watchedVideos, setWatchedVideos] = useState<Record<string, boolean>>({});
  const [completing, setCompleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const mod = getModuleById(id);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("kennou_progress");
    if (stored) setProgress(JSON.parse(stored));
    const watched = localStorage.getItem(`kennou_watched_${id}`);
    if (watched) setWatchedVideos(JSON.parse(watched));
  }, [id]);

  if (isLoading || !mounted) {
    return (
      <div className="px-6 md:px-16 py-16 max-w-4xl mx-auto">
        <div className="skeleton h-4 w-32 rounded mb-6" />
        <div className="skeleton h-5 w-24 rounded mb-2" />
        <div className="skeleton h-10 w-80 rounded-xl mb-3" />
        <div className="skeleton h-16 w-full rounded-xl mb-10" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-24 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  if (!mod) {
    return (
      <div className="px-6 md:px-16 py-16 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Module not found</h1>
        <Link href="/dashboard" className="text-coral font-semibold">← Back to Dashboard</Link>
      </div>
    );
  }

  // Check if this module is unlocked (sequential)
  const modIndex = MODULES.findIndex((m) => m.id === id);
  const isUnlocked = modIndex === 0 || progress[MODULES[modIndex - 1].id];

  if (!isUnlocked) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">🔒</div>
          <h1 className="text-2xl font-extrabold mb-3">Module Locked</h1>
          <p className="text-gray-600 mb-6">Complete the previous module first to unlock this one.</p>
          <Link href="/dashboard" className="text-coral font-semibold hover:underline">← Back to Programme</Link>
        </div>
      </div>
    );
  }

  const isCompleted = progress[id] || false;
  const allVideosWatched = mod.videos.every((_, i) => watchedVideos[`${i}`]);

  const toggleVideoWatched = (index: number) => {
    const updated = { ...watchedVideos, [`${index}`]: !watchedVideos[`${index}`] };
    setWatchedVideos(updated);
    localStorage.setItem(`kennou_watched_${id}`, JSON.stringify(updated));
  };

  const handleMarkComplete = async () => {
    setCompleting(true);
    await new Promise((r) => setTimeout(r, 1000));
    const updated = { ...progress, [id]: true };
    setProgress(updated);
    localStorage.setItem("kennou_progress", JSON.stringify(updated));
    setCompleting(false);
    addToast(`Module "${mod.title}" marked as complete!`);
  };

  const watchedCount = mod.videos.filter((_, i) => watchedVideos[`${i}`]).length;

  return (
    <div className="px-6 md:px-16 py-16 max-w-4xl mx-auto animate-fade-in">
      <Link href="/dashboard" className="text-sm text-gray-400 hover:text-coral transition-colors mb-6 inline-block">
        ← Back to Programme
      </Link>

      <div className="flex items-center gap-3 mb-2">
        <p className="text-xs font-bold text-amber uppercase tracking-wide">Module {mod.num}</p>
        {isCompleted && (
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">✓ Completed</span>
        )}
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">{mod.title}</h1>
      <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-2xl">{mod.description}</p>

      {/* Progress within module */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-8 flex items-center gap-4">
        <div className="flex-1">
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-coral to-amber rounded-full transition-all duration-500"
              style={{ width: `${mod.videos.length > 0 ? (watchedCount / mod.videos.length) * 100 : 0}%` }}
            />
          </div>
        </div>
        <span className="text-sm font-semibold text-gray-600">{watchedCount}/{mod.videos.length} watched</span>
      </div>

      {/* Video list */}
      <div className="space-y-4">
        {mod.videos.map((video, i) => (
          <VideoCard
            key={i}
            title={video.title}
            duration={video.duration}
            completed={!!watchedVideos[`${i}`]}
            locked={false}
            onToggleComplete={() => toggleVideoWatched(i)}
          />
        ))}
      </div>

      {/* Mark Complete button */}
      {!isCompleted && (
        <button
          onClick={handleMarkComplete}
          disabled={completing || !allVideosWatched}
          className={`mt-8 w-full py-4 rounded-full font-bold text-lg shadow-lg transition-transform flex items-center justify-center gap-2 ${
            allVideosWatched
              ? "bg-gradient-to-br from-coral to-amber text-white shadow-coral/30 hover:-translate-y-0.5"
              : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
          }`}
        >
          {completing ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Completing...
            </>
          ) : allVideosWatched ? (
            "Mark Module as Complete ✓"
          ) : (
            `Watch all videos first (${watchedCount}/${mod.videos.length})`
          )}
        </button>
      )}

      {isCompleted && (
        <div className="mt-8 bg-green-50 rounded-2xl p-6 text-center">
          <p className="text-green-700 font-bold text-lg">🎉 Module Complete!</p>
          <p className="text-green-600 text-sm mt-1">
            {modIndex < MODULES.length - 1
              ? `Next up: ${MODULES[modIndex + 1].title}`
              : "All modules done! Book your interview now."
            }
          </p>
          <Link
            href={modIndex < MODULES.length - 1 ? `/dashboard/module/${MODULES[modIndex + 1].id}` : "/dashboard/book-interview"}
            className="inline-block mt-4 bg-gradient-to-br from-coral to-amber text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-coral/30 hover:-translate-y-0.5 transition-transform"
          >
            {modIndex < MODULES.length - 1 ? "Next Module →" : "Book Interview →"}
          </Link>
        </div>
      )}
    </div>
  );
}
