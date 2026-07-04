import React from 'react';

export default function AdminDashboard({ navigateTo }) {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-brand-navy">HR Administration Control Center</h1> [cite: 229]
        <p className="text-gray-400">System Level 1 Root Permissions Authorized</p>
      </header>

      {/* Grid view containing operational modules for Admin requested in specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div onClick={() => navigateTo('EmployeeManagement')} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:border-brand-teal transition"> [cite: 231]
          <div className="text-2xl mb-2">👥</div>
          <h3 className="font-bold text-brand-navy">Employee Base</h3> [cite: 231]
          <p className="text-xs text-gray-400 mt-1">Onboard and manage team directories</p>
        </div>
        <div onClick={() => navigateTo('AttendanceManagement')} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:border-brand-teal transition"> [cite: 232]
          <div className="text-2xl mb-2">📋</div>
          <h3 className="font-bold text-brand-navy">Attendance Overview</h3> [cite: 232]
          <p className="text-xs text-gray-400 mt-1">Audit operational check-in logs</p>
        </div>
        <div onClick={() => navigateTo('LeaveApproval')} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:border-brand-teal transition"> [cite: 233]
          <div className="text-2xl mb-2">⚖️</div>
          <h3 className="font-bold text-brand-navy">Leave Pipeline</h3> [cite: 233]
          <p className="text-xs text-gray-400 mt-1">Approve or reject time-off intents</p>
        </div>
        <div onClick={() => navigateTo('PayrollManagement')} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:border-brand-teal transition">
          <div className="text-2xl mb-2">📈</div>
          <h3 className="font-bold text-brand-navy">Payroll Matrix</h3>
          <p className="text-xs text-gray-400 mt-1">Modify structural salary data</p>
        </div>
      </div>
    </div>
  );
}