export default function AdminPage() {
  const applicants = [
    { name: "Amara K.", email: "amara.k@email.com", age: 22, eligible: true, progress: 100, status: "Accepted" },
    { name: "Jordan M.", email: "jordan.m@email.com", age: 20, eligible: true, progress: 100, status: "Accepted" },
    { name: "Priya S.", email: "priya.s@email.com", age: 23, eligible: true, progress: 100, status: "Accepted" },
    { name: "David W.", email: "david.w@email.com", age: 21, eligible: true, progress: 75, status: "In Progress" },
    { name: "Safia H.", email: "safia.h@email.com", age: 19, eligible: true, progress: 50, status: "In Progress" },
    { name: "Liam T.", email: "liam.t@email.com", age: 24, eligible: true, progress: 33, status: "In Progress" },
    { name: "Emma R.", email: "emma.r@email.com", age: 22, eligible: true, progress: 0, status: "Not Started" },
    { name: "Marcus J.", email: "marcus.j@email.com", age: 25, eligible: false, progress: 0, status: "Ineligible" },
  ];

  return (
    <div className="px-6 md:px-16 py-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">Admin Panel</h1>
          <p className="text-gray-600">Manage applicants, track progress, and review candidates.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-center">
            <p className="text-2xl font-bold text-coral">{applicants.filter(a => a.eligible).length}</p>
            <p className="text-xs text-gray-400">Eligible</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">{applicants.filter(a => a.status === "Accepted").length}</p>
            <p className="text-xs text-gray-400">Accepted</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-center">
            <p className="text-2xl font-bold text-amber">{applicants.filter(a => a.status === "In Progress").length}</p>
            <p className="text-xs text-gray-400">In Progress</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wide">Name</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wide">Email</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wide">Age</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wide">Eligible</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wide">Progress</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold">{applicant.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{applicant.email}</td>
                  <td className="px-6 py-4 text-sm">{applicant.age}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      applicant.eligible ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                    }`}>
                      {applicant.eligible ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-coral to-amber rounded-full"
                          style={{ width: `${applicant.progress}%` }}
                        />
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
