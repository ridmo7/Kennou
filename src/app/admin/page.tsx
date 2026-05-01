"use client";

import { useState, useMemo } from "react";

type Applicant = {
  name: string;
  email: string;
  age: number;
  eligible: boolean;
  progress: number;
  status: string;
  postcode: string;
  appliedDate: string;
};

const allApplicants: Applicant[] = [
  { name: "Amara K.", email: "amara.k@email.com", age: 22, eligible: true, progress: 100, status: "Accepted", postcode: "E1 6AN", appliedDate: "2 Apr 2026" },
  { name: "Jordan M.", email: "jordan.m@email.com", age: 20, eligible: true, progress: 100, status: "Accepted", postcode: "SE15 1TT", appliedDate: "3 Apr 2026" },
  { name: "Priya S.", email: "priya.s@email.com", age: 23, eligible: true, progress: 100, status: "Accepted", postcode: "B19 2QH", appliedDate: "5 Apr 2026" },
  { name: "David W.", email: "david.w@email.com", age: 21, eligible: true, progress: 75, status: "In Progress", postcode: "M8 5DL", appliedDate: "6 Apr 2026" },
  { name: "Safia H.", email: "safia.h@email.com", age: 19, eligible: true, progress: 50, status: "In Progress", postcode: "LS9 6AW", appliedDate: "8 Apr 2026" },
  { name: "Liam T.", email: "liam.t@email.com", age: 24, eligible: true, progress: 33, status: "In Progress", postcode: "CF11 6AQ", appliedDate: "9 Apr 2026" },
  { name: "Emma R.", email: "emma.r@email.com", age: 22, eligible: true, progress: 0, status: "Not Started", postcode: "NE1 7JB", appliedDate: "10 Apr 2026" },
  { name: "Marcus J.", email: "marcus.j@email.com", age: 25, eligible: false, progress: 0, status: "Ineligible", postcode: "SW1A 1AA", appliedDate: "10 Apr 2026" },
];

const statusOptions = ["All", "Accepted", "In Progress", "Not Started", "Ineligible"];

export default function AdminPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem("kennou_admin_notes") || "{}");
    } catch { return {}; }
  });

  const saveNote = (email: string, note: string) => {
    const updated = { ...notes, [email]: note };
    setNotes(updated);
    localStorage.setItem("kennou_admin_notes", JSON.stringify(updated));
  };

  const filtered = useMemo(() => {
    return allApplicants.filter((a) => {
      const matchesSearch =
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || a.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const stats = {
    eligible: allApplicants.filter((a) => a.eligible).length,
    accepted: allApplicants.filter((a) => a.status === "Accepted").length,
    inProgress: allApplicants.filter((a) => a.status === "In Progress").length,
  };

  return (
    <div className="px-6 md:px-16 py-16 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">Admin Panel</h1>
          <p className="text-gray-600">Manage applicants, track progress, and review candidates.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-center">
            <p className="text-2xl font-bold text-coral">{stats.eligible}</p>
            <p className="text-xs text-gray-400">Eligible</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
            <p className="text-xs text-gray-400">Accepted</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-center">
            <p className="text-2xl font-bold text-amber">{stats.inProgress}</p>
            <p className="text-xs text-gray-400">In Progress</p>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">🔍</span>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>{s === "All" ? "All Statuses" : s}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-400 mb-3">Showing {filtered.length} of {allApplicants.length} applicants</p>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wide">Name</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wide hidden md:table-cell">Email</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wide hidden sm:table-cell">Age</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wide">Progress</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wide">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((applicant, i) => (
                <>
                  <tr
                    key={`row-${i}`}
                    className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer ${expanded === i ? "bg-gray-50/80" : ""}`}
                    onClick={() => setExpanded(expanded === i ? null : i)}
                  >
                    <td className="px-6 py-4 font-semibold">{applicant.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">{applicant.email}</td>
                    <td className="px-6 py-4 text-sm hidden sm:table-cell">{applicant.age}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-coral to-amber rounded-full transition-all" style={{ width: `${applicant.progress}%` }} />
                        </div>
                        <span className="text-xs text-gray-400">{applicant.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        applicant.status === "Accepted" ? "bg-green-100 text-green-700" :
                        applicant.status === "In Progress" ? "bg-amber-soft text-amber" :
                        applicant.status === "Ineligible" ? "bg-red-100 text-red-600" :
                        "bg-gray-100 text-gray-400"
                      }`}>
                        {applicant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-gray-300 text-xs transition-transform inline-block ${expanded === i ? "rotate-90" : ""}`}>▶</span>
                    </td>
                  </tr>
                  {expanded === i && (
                    <tr key={`detail-${i}`} className="bg-gray-50/60">
                      <td colSpan={6} className="px-6 py-5">
                        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
                          <div>
                            <p className="text-xs text-gray-400 mb-1">Email</p>
                            <p className="text-sm font-medium">{applicant.email}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-1">Postcode</p>
                            <p className="text-sm font-medium">{applicant.postcode}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-1">Applied</p>
                            <p className="text-sm font-medium">{applicant.appliedDate}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-1">Eligible</p>
                            <p className="text-sm font-medium">{applicant.eligible ? "Yes" : "No"}</p>
                          </div>
                          <div className="sm:col-span-2">
                            <p className="text-xs text-gray-400 mb-1">Admin Notes</p>
                            <textarea
                              value={notes[applicant.email] || ""}
                              onChange={(e) => saveNote(applicant.email, e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              placeholder="Add private notes about this applicant..."
                              rows={2}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition resize-none"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-400 text-sm">No applicants match your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
