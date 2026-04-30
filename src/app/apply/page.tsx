export default function ApplyPage() {
  return (
    <div className="px-6 md:px-16 py-16 max-w-3xl mx-auto">
      <p className="text-sm uppercase tracking-widest text-coral font-bold mb-3">Step 1</p>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Check Your Eligibility</h1>
      <p className="text-gray-600 mb-10 text-lg leading-relaxed">
        Kennou is free for young people from disadvantaged socio-economic backgrounds.
        Complete the form below to see if you qualify.
      </p>

      <form className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold mb-2">Full Name</label>
          <input
            type="text"
            placeholder="e.g. Jordan Smith"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-2">Email Address</label>
          <input
            type="email"
            placeholder="jordan@example.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-semibold mb-2">Age</label>
          <input
            type="number"
            placeholder="e.g. 21"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition"
          />
        </div>

        {/* Postcode */}
        <div>
          <label className="block text-sm font-semibold mb-2">Postcode</label>
          <input
            type="text"
            placeholder="e.g. E1 6AN"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition"
          />
          <p className="text-xs text-gray-400 mt-1">Used to check Index of Multiple Deprivation (IMD) — we don&apos;t store your full address.</p>
        </div>

        {/* Free School Meals */}
        <div>
          <label className="block text-sm font-semibold mb-3">Are you or have you ever been on Free School Meals?</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="fsm" className="w-4 h-4 accent-coral" />
              <span>Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="fsm" className="w-4 h-4 accent-coral" />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* Deprivation */}
        <div>
          <label className="block text-sm font-semibold mb-3">
            Is your address in the 10%, 20%, 30%, or 40% most deprived area in the UK?
          </label>
          <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition">
            <option value="">Select...</option>
            <option value="10">Top 10% most deprived</option>
            <option value="20">Top 20% most deprived</option>
            <option value="30">Top 30% most deprived</option>
            <option value="40">Top 40% most deprived</option>
            <option value="none">None of the above</option>
          </select>
        </div>

        {/* Household Income */}
        <div>
          <label className="block text-sm font-semibold mb-3">
            Is your household annual income below £30,000?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="income" className="w-4 h-4 accent-coral" />
              <span>Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="income" className="w-4 h-4 accent-coral" />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold mb-2">Create a Password</label>
          <input
            type="password"
            placeholder="Minimum 8 characters"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition"
          />
        </div>

        {/* Submit */}
        <button
          type="button"
          className="w-full bg-gradient-to-br from-coral to-amber text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-coral/30 hover:-translate-y-0.5 transition-transform mt-4"
        >
          Check Eligibility & Sign Up
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </div>
  );
}
