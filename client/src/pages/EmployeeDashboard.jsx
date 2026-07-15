import React from 'react';

export default function EmployeeDashboard({ user, navigateTo }) {
  // Hardcoded or computed statistics for premium dashboard presentation
  const stats = [
    { title: "Attendance Status", value: "Checked Out", icon: "⏱️", color: "text-amber-500", bg: "bg-amber-50" },
    { title: "Active Leave Balance", value: "14 Days", icon: "📅", color: "text-brand-teal", bg: "bg-brand-tealLight" },
    { title: "Current Pay Slip Status", value: "Verified", icon: "💸", color: "text-green-600", bg: "bg-green-50" },
    { title: "Corporate Clearance Scope", value: "L1 Engineer", icon: "🛡️", color: "text-blue-600", bg: "bg-blue-50" }
  ];

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-navy tracking-tight">
            Welcome back, {user?.name || 'Team Member'}
          </h1>
          <p className="text-sm text-brand-slate font-medium mt-1">
            WorkSphere Node: <span className="font-mono text-brand-teal">{user?.employeeId || 'WS-User'}</span>
          </p>
        </div>
        <div className="bg-white/60 border border-white/80 px-4 py-2 rounded-2xl shadow-sm text-xs font-semibold text-brand-navy backdrop-blur flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></span>
          <span>System Status: Online</span>
        </div>
      </header>

      {/* Top statistics summary panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow duration-200">
            <div>
              <span className="text-xs text-brand-slate block font-bold uppercase tracking-wider">{s.title}</span>
              <span className="text-lg font-extrabold text-brand-navy mt-1 block">{s.value}</span>
            </div>
            <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center text-xl`}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Grid view containing operational modules requested in specifications */}
      <div>
        <h2 className="text-lg font-bold text-brand-navy mb-4">Operational Shortcuts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            onClick={() => navigateTo('Profile')} 
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:border-brand-teal hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-200">👤</div>
            <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-teal transition-colors">Profile Hub</h3>
            <p className="text-xs text-brand-slate font-medium mt-1">Review operational personal profile and registry matrix</p>
          </div>

          <div 
            onClick={() => navigateTo('Attendance')} 
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:border-brand-teal hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-200">⏱️</div>
            <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-teal transition-colors">Daily Attendance</h3>
            <p className="text-xs text-brand-slate font-medium mt-1">Commit entry logs and check-in/out logging metrics</p>
          </div>

          <div 
            onClick={() => navigateTo('Leave')} 
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:border-brand-teal hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-200">📅</div>
            <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-teal transition-colors">Time-Off Pipeline</h3>
            <p className="text-xs text-brand-slate font-medium mt-1">File operational leaves and tracking requests</p>
          </div>

          <div 
            onClick={() => navigateTo('Payroll')} 
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:border-brand-teal hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-200">💵</div>
            <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-teal transition-colors">Payroll Ledger</h3>
            <p className="text-xs text-brand-slate font-medium mt-1">View personal salary details, base salary, and pay slips</p>
          </div>
        </div>
      </div>
    </div>
  );
}