import React, { useState, useEffect } from 'react';

export default function AttendanceManagement() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token") || "test";
    fetch('http://localhost:5000/api/admin/attendance', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => setLogs(Array.isArray(data) ? data : []))
    .catch(err => console.error("Error fetching admin attendance:", err));
  }, []);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-brand-navy">
            Perimeter Attendance Audits
          </h2>
          <p className="text-xs text-brand-slate font-medium mt-0.5">Real-time log audits of employee check-in and check-out times</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-bold text-brand-navy">Global Corporate Attendance Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-lightBg text-[11px] text-brand-slate uppercase font-bold tracking-wider">
                <th className="p-4 pl-6">Employee Node</th>
                <th className="p-4">Date Index</th>
                <th className="p-4">Check In</th>
                <th className="p-4">Check Out</th>
                <th className="p-4 pr-6">Status Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-brand-slate italic font-medium">
                    No corporate attendance logs recorded in current database index.
                  </td>
                </tr>
              ) : (
                logs.map(log => (
                  <tr key={log.id} className="hover:bg-brand-lightBg/40 transition duration-150">
                    <td className="p-4 pl-6">
                      <span className="font-semibold block text-brand-navy">{log.name || 'Unknown'}</span>
                      <span className="text-xs font-mono font-bold text-brand-teal">{log.employee_id || 'N/A'}</span>
                    </td>
                    <td className="p-4 font-semibold text-brand-slate">
                      {log.date ? new Date(log.date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-4 text-brand-navy font-semibold">{log.check_in || '--:--'}</td>
                    <td className="p-4 text-brand-navy font-semibold">{log.check_out || '--:--'}</td>
                    <td className="p-4 pr-6">
                      <span className={`inline-block text-[11px] px-3 py-1 rounded-full font-bold ${
                        log.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {log.status || 'Absent'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}