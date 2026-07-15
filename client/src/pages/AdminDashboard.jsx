import React from 'react';

export default function AdminDashboard({ user, navigateTo }) {
  // Mock administrative stats overview
  const adminStats = [
    { title: "Active Nodes", value: "2 Employees", icon: "👥", color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "Today Attendance", value: "0 Present", icon: "⏱️", color: "text-green-600", bg: "bg-green-50" },
    { title: "Pending Leaves", value: "0 Actions", icon: "⚖️", color: "text-amber-500", bg: "bg-amber-50" },
    { title: "Processed Ledger", value: "₹0.00", icon: "📈", color: "text-brand-teal", bg: "bg-brand-tealLight" }
  ];

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-navy tracking-tight">HR Control Center</h1>
          <p className="text-sm text-brand-slate font-medium mt-1">
            Access Scope: <span className="font-mono text-brand-teal">System root (Admin privileges authorized)</span>
          </p>
        </div>
        <div className="bg-brand-teal/10 border border-brand-teal/20 px-4 py-2 rounded-2xl shadow-sm text-xs font-bold text-brand-teal flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-teal animate-ping"></span>
          <span>Security Clearance Level 1</span>
        </div>
      </header>

      {/* Admin stats counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {adminStats.map((s, idx) => (
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

      {/* Grid view containing operational modules for Admin requested in specifications */}
      <div>
        <h2 className="text-lg font-bold text-brand-navy mb-4">Administrative Directories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            onClick={() => navigateTo('EmployeeManagement')} 
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:border-brand-teal hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-200">👥</div>
            <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-teal transition-colors">Employee Base</h3>
            <p className="text-xs text-brand-slate font-medium mt-1">Onboard operational members, assign designations and departments</p>
          </div>

          <div 
            onClick={() => navigateTo('AttendanceManagement')} 
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:border-brand-teal hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-200">📋</div>
            <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-teal transition-colors">Attendance Overview</h3>
            <p className="text-xs text-brand-slate font-medium mt-1">Audit daily check-in logs and tracking streams across all nodes</p>
          </div>

          <div 
            onClick={() => navigateTo('LeaveApproval')} 
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:border-brand-teal hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-200">⚖️</div>
            <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-teal transition-colors">Leave Pipeline</h3>
            <p className="text-xs text-brand-slate font-medium mt-1">Approve or reject time-off requests, append administrative feedback</p>
          </div>

          <div 
            onClick={() => navigateTo('PayrollManagement')} 
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:border-brand-teal hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-200">📈</div>
            <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-teal transition-colors">Payroll Matrix</h3>
            <p className="text-xs text-brand-slate font-medium mt-1">Audit allowances and deductions, and compute net salary structures</p>
          </div>
        </div>
      </div>
    </div>
  );
}