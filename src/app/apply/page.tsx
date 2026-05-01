"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function ApplyPage() {
  const { signup } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "", email: "", age: "", postcode: "",
    fsm: "", deprivation: "", income: "", password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [ineligible, setIneligible] = useState(false);

  const set = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-coral/50 transition ${
      errors[field] ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-coral"
    }`;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Full name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email address.";
    if (!form.age.trim()) errs.age = "Age is required.";
    else if (Number(form.age) < 16 || Number(form.age) > 30) errs.age = "Age must be between 16 and 30.";
    if (!form.postcode.trim()) errs.postcode = "Postcode is required.";
    if (!form.fsm) errs.fsm = "Please select an option.";
    if (!form.deprivation) errs.deprivation = "Please select an option.";
    if (!form.income) errs.income = "Please select an option.";
    if (!form.password.trim()) errs.password = "Password is required.";
    else if (form.password.length < 8) errs.password = "Minimum 8 characters.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const result = await signup({
      name: form.name,
      email: form.email,
      age: Number(form.age),
      postcode: form.postcode,
      freeSchoolMeals: form.fsm === "yes",
      deprivation: form.deprivation,
      incomeBelow30k: form.income === "yes",
    });
    setLoading(false);

    if (result.eligible) {
      addToast("Welcome to Kennou! Let's get started.");
      router.push("/dashboard");
    } else {
      setIneligible(true);
    }
  };

  // Ineligible screen
  if (ineligible) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center max-w-lg animate-fade-in">
          <div className="w-20 h-20 bg-amber-soft rounded-full flex items-center justify-center text-3xl mx-auto mb-6">💛</div>
          <h1 className="text-2xl font-extrabold mb-3">We appreciate your interest</h1>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Based on the information provided, you don&apos;t currently meet the eligibility criteria for the Kennou programme. Our programme is specifically designed for young people from the most disadvantaged socio-economic backgrounds in the UK.
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            This doesn&apos;t mean there aren&apos;t great resources out there for you. Here are some alternatives:
          </p>
          <div className="bg-white rounded-2xl p-6 shadow-sm text-left space-y-3 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-lg">🎓</span>
              <div>
                <p className="font-semibold text-sm">National Careers Service</p>
                <p className="text-xs text-gray-400">Free career advice and skills training</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">💼</span>
              <div>
                <p className="font-semibold text-sm">The Prince&apos;s Trust</p>
                <p className="text-xs text-gray-400">Programmes for 11–30 year olds</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">📚</span>
              <div>
                <p className="font-semibold text-sm">LinkedIn Learning</p>
                <p className="text-xs text-gray-400">Free courses via many UK libraries</p>
              </div>
            </div>
          </div>
          <Link href="/" className="text-coral font-semibold hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 py-16 max-w-3xl mx-auto animate-fade-in">
      <p className="text-sm uppercase tracking-widest text-coral font-bold mb-3">Step 1</p>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Check Your Eligibility</h1>
      <p className="text-gray-600 mb-10 text-lg leading-relaxed">
        Kennou is free for young people from disadvantaged socio-economic backgrounds.
        Complete the form below to see if you qualify.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold mb-2">Full Name</label>
          <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Jordan Smith" className={inputClass("name")} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-2">Email Address</label>
          <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jordan@example.com" className={inputClass("email")} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-semibold mb-2">Age</label>
          <input type="number" value={form.age} onChange={(e) => set("age", e.target.value)} placeholder="e.g. 21" className={inputClass("age")} />
          {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
        </div>

        {/* Postcode */}
        <div>
          <label className="block text-sm font-semibold mb-2">Postcode</label>
          <input type="text" value={form.postcode} onChange={(e) => set("postcode", e.target.value)} placeholder="e.g. E1 6AN" className={inputClass("postcode")} />
          <p className="text-xs text-gray-400 mt-1">Used to check Index of Multiple Deprivation (IMD) — we don&apos;t store your full address.</p>
          {errors.postcode && <p className="text-red-500 text-xs mt-1">{errors.postcode}</p>}
        </div>

        {/* Free School Meals */}
        <div>
          <label className="block text-sm font-semibold mb-3">Are you or have you ever been on Free School Meals?</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="fsm" value="yes" checked={form.fsm === "yes"} onChange={(e) => set("fsm", e.target.value)} className="w-4 h-4 accent-coral" />
              <span>Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="fsm" value="no" checked={form.fsm === "no"} onChange={(e) => set("fsm", e.target.value)} className="w-4 h-4 accent-coral" />
              <span>No</span>
            </label>
          </div>
          {errors.fsm && <p className="text-red-500 text-xs mt-1">{errors.fsm}</p>}
        </div>

        {/* Deprivation */}
        <div>
          <label className="block text-sm font-semibold mb-3">Is your address in the 10%, 20%, 30%, or 40% most deprived area in the UK?</label>
          <select value={form.deprivation} onChange={(e) => set("deprivation", e.target.value)} className={inputClass("deprivation")}>
            <option value="">Select...</option>
            <option value="10">Top 10% most deprived</option>
            <option value="20">Top 20% most deprived</option>
            <option value="30">Top 30% most deprived</option>
            <option value="40">Top 40% most deprived</option>
            <option value="none">None of the above</option>
          </select>
          {errors.deprivation && <p className="text-red-500 text-xs mt-1">{errors.deprivation}</p>}
        </div>

        {/* Household Income */}
        <div>
          <label className="block text-sm font-semibold mb-3">Is your household annual income below £30,000?</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="income" value="yes" checked={form.income === "yes"} onChange={(e) => set("income", e.target.value)} className="w-4 h-4 accent-coral" />
              <span>Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="income" value="no" checked={form.income === "no"} onChange={(e) => set("income", e.target.value)} className="w-4 h-4 accent-coral" />
              <span>No</span>
            </label>
          </div>
          {errors.income && <p className="text-red-500 text-xs mt-1">{errors.income}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold mb-2">Create a Password</label>
          <input type="password" value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="Minimum 8 characters" className={inputClass("password")} />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-br from-coral to-amber text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-coral/30 hover:-translate-y-0.5 transition-transform mt-4 disabled:opacity-60 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Checking eligibility...
            </>
          ) : (
            "Check Eligibility & Sign Up"
          )}
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          Already have an account? <Link href="/login" className="text-coral font-semibold hover:underline">Log in</Link>
        </p>
      </form>
    </div>
  );
}
