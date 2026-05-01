"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function BookInterviewPage() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);

  const timeSlots = [
    { day: "Mon 12 May", slots: ["10:00", "14:00", "16:00"] },
    { day: "Tue 13 May", slots: ["09:30", "11:00", "15:30"] },
    { day: "Wed 14 May", slots: ["10:00", "13:00"] },
    { day: "Thu 15 May", slots: ["09:00", "11:30", "14:00", "16:30"] },
    { day: "Fri 16 May", slots: ["10:00", "12:00"] },
  ];

  // Auth gate
  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-4xl mb-4">🔒</p>
          <h2 className="text-xl font-extrabold mb-2">Log in to continue</h2>
          <p className="text-gray-600 text-sm mb-6">You need to be logged in to book your interview.</p>
          <Link href="/login" className="bg-gradient-to-br from-coral to-amber text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-coral/30 hover:-translate-y-0.5 transition-transform">Log In</Link>
        </div>
      </div>
    );
  }

  const handleFileSelect = () => {
    // Simulate file selection
    setUploadedFile("My_Kennou_Presentation.pdf");
    addToast("File uploaded successfully!", "success");
  };

  const handleConfirm = async () => {
    if (!uploadedFile || !selectedSlot) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setBooked(true);
    setLoading(false);
    addToast("Interview booked! Check your email for confirmation.", "success");
  };

  // Booked confirmation screen
  if (booked) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6 animate-fade-in">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">✅</div>
          <h1 className="text-2xl font-extrabold mb-2">Interview Booked!</h1>
          <p className="text-gray-600 mb-2">
            Your interview is confirmed for <span className="font-bold text-deep-purple">{selectedSlot}</span>.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            We&apos;ve sent a confirmation email with the meeting link. Prepare your presentation and be ready 5 minutes early.
          </p>
          <Link href="/dashboard" className="text-coral font-semibold hover:underline">← Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 py-16 max-w-4xl mx-auto animate-fade-in">
      <Link href="/dashboard" className="text-sm text-gray-400 hover:text-coral transition-colors mb-6 inline-block">
        ← Back to Programme
      </Link>

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Book Your Interview</h1>
      <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-2xl">
        You&apos;ve completed all modules — well done! Now upload your presentation and pick a 30-minute slot.
      </p>

      {/* Upload section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
        <h2 className="font-bold text-lg mb-2">1. Upload Your Presentation</h2>
        <p className="text-gray-600 text-sm mb-4">
          Create a short presentation on what you feel you&apos;ve learned. You&apos;ll present the first 10 minutes of your interview.
        </p>
        {uploadedFile ? (
          <div className="border-2 border-green-200 bg-green-50 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">✅</div>
            <p className="font-semibold text-green-700">{uploadedFile}</p>
            <button onClick={() => setUploadedFile(null)} className="text-xs text-gray-400 hover:text-red-400 mt-2 transition-colors">Remove</button>
          </div>
        ) : (
          <button
            onClick={handleFileSelect}
            className="w-full border-2 border-dashed border-gray-200 rounded-xl p-10 text-center hover:border-coral/50 transition-colors cursor-pointer"
          >
            <div className="text-4xl mb-3">📄</div>
            <p className="font-semibold text-gray-600">Drop your file here or click to browse</p>
            <p className="text-sm text-gray-400 mt-1">PDF, PPT, or PPTX — max 20MB</p>
          </button>
        )}
      </div>

      {/* Time slot section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="font-bold text-lg mb-2">2. Select a Time Slot</h2>
        <p className="text-gray-600 text-sm mb-6">
          Each interview is 30 minutes: 10 min presentation + 20 min conversation.
        </p>

        <div className="space-y-6">
          {timeSlots.map((day) => (
            <div key={day.day}>
              <p className="text-sm font-semibold text-deep-purple mb-2">{day.day}</p>
              <div className="flex flex-wrap gap-2">
                {day.slots.map((slot) => {
                  const id = `${day.day} — ${slot}`;
                  const active = selectedSlot === id;
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(id)}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                        active
                          ? "border-coral bg-coral text-white"
                          : "border-gray-200 hover:border-coral hover:text-coral"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleConfirm}
          disabled={!uploadedFile || !selectedSlot || loading}
          className="mt-8 w-full bg-gradient-to-br from-coral to-amber text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-coral/30 hover:-translate-y-0.5 transition-transform disabled:opacity-40 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Confirming...
            </>
          ) : (
            "Confirm Booking"
          )}
        </button>
        {(!uploadedFile || !selectedSlot) && (
          <p className="text-xs text-gray-400 text-center mt-3">
            {!uploadedFile && !selectedSlot
              ? "Upload your presentation and select a time slot to continue."
              : !uploadedFile
              ? "Upload your presentation to continue."
              : "Select a time slot to continue."}
          </p>
        )}
      </div>
    </div>
  );
}
