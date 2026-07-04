import React from 'react';

export default function EmployeeDashboard({ user, navigateTo }) {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Welcome back, {user?.name || 'Team Member'}</h1> [cite: 228]
        <p className="text-gray-500">Node Configuration Access: {user?.employeeId || 'WS-User'}</p> [cite: 228]
      </header>

      {/* Grid view containing operational modules requested in specifications */}
      <div className="grid grid-cols-1 md-grid-cols-2 lg:grid-cols-4 gap-6">
        <div onClick={() => navigateTo('Profile')} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:border-brand-teal transition"> [cite: 223, 224]
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold mb-4">👤</div>
          <h3 className="text-lg font-bold">Profile Hub</h3> [cite: 224]
          <p className="text-xs text-gray-400 mt-1">Review operational access data structure</p>
        </div>

        <div onClick={() => navigateTo('Attendance')} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:border-brand-teal transition"> [cite: 223, 225]
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 font-bold mb-4">⏱️</div>
          <h3 className="text-lg font-bold">Daily Attendance</h3> [cite: 225]
          <p className="text-xs text-gray-400 mt-1">Commit entry logging parameters</p>
        </div>

        <div onClick={() => navigateTo('Leave')} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:border-brand-teal transition"> [cite: 223, 226]
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 font-bold mb-4">📅</div>
          <h3 className="text-lg font-bold">Time-Off Pipeline</h3> [cite: 226]
          <p className="text-xs text-gray-400 mt-1">File operational leaves</p>
        </div>

        <div onClick={() => navigateTo('Payroll')} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:border-brand-teal transition"> [cite: 223]
          <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-brand-teal font-bold mb-4">💵</div>
          <h3 className="text-lg font-bold">Payroll Ledger</h3>
          <p className="text-xs text-gray-400 mt-1">Read-only structural metrics</p>
        </div>
      </div>
    </div>
  );
}