import Link from "next/link";

export default function BookInterviewPage() {
  const timeSlots = [
    { day: "Mon 12 May", slots: ["10:00", "14:00", "16:00"] },
    { day: "Tue 13 May", slots: ["09:30", "11:00", "15:30"] },
    { day: "Wed 14 May", slots: ["10:00", "13:00"] },
    { day: "Thu 15 May", slots: ["09:00", "11:30", "14:00", "16:30"] },
    { day: "Fri 16 May", slots: ["10:00", "12:00"] },
  ];

  return (
    <div className="px-6 md:px-16 py-16 max-w-4xl mx-auto">
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
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center hover:border-coral/50 transition-colors cursor-pointer">
          <div className="text-4xl mb-3">📄</div>
          <p className="font-semibold text-gray-600">Drop your file here or click to browse</p>
          <p className="text-sm text-gray-400 mt-1">PDF, PPT, or PPTX — max 20MB</p>
        </div>
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
                {day.slots.map((slot) => (
                  <button
                    key={slot}
                    className="px-4 py-2 rounded-full border border-gray-200 text-sm font-medium hover:border-coral hover:text-coral transition-colors"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button className="mt-8 w-full bg-gradient-to-br from-coral to-amber text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-coral/30 hover:-translate-y-0.5 transition-transform">
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
