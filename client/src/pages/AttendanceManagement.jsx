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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b">
        <h3 className="font-bold text-navyPrimary">Global Corporate Attendance Streams</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-400 uppercase font-semibold">
              <th className="p-4">Employee</th>
              <th className="p-4">Date Index</th>
              <th className="p-4">Check In</th>
              <th className="p-4">Check Out</th>
              <th className="p-4">Status Flag</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {logs.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-400 italic">
                  No corporate attendance logs recorded.
                </td>
              </tr>
            ) : (
              logs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <span className="font-bold block text-navyPrimary">{log.name || 'Unknown'}</span>
                    <span className="text-xs text-gray-400">{log.employee_id || 'N/A'}</span>
                  </td>
                  <td className="p-4">
                    {log.date ? new Date(log.date).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="p-4 text-gray-600">{log.check_in || '--:--'}</td>
                  <td className="p-4 text-gray-600">{log.check_out || '--:--'}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                      log.status === 'Present' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
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
  );
}