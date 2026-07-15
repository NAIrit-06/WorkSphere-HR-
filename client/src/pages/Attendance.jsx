import React, { useState, useEffect } from 'react';

export default function Attendance({ user }) {
  const [logs, setLogs] = useState([]);

  const fetchLogs = () => {
    const token = localStorage.getItem("token") || "test";
    fetch('http://localhost:5000/api/employee/attendance', {
      headers: { 
        'x-user-id': user?.id || '2', 
        'Authorization': `Bearer ${token}` 
      }
    })
    .then(res => res.json())
    .then(data => setLogs(Array.isArray(data) ? data : []))
    .catch(err => console.error("Error fetching logs:", err));
  };

  useEffect(() => { 
    fetchLogs(); 
  }, [user]);

  const handleAction = (type) => {
    const token = localStorage.getItem("token") || "test";
    fetch(`http://localhost:5000/api/employee/attendance/${type}`, {
      method: 'POST',
      headers: { 
        'x-user-id': user?.id || '2', 
        'Authorization': `Bearer ${token}` 
      }
    })
    .then(res => res.json())
    .then(() => { 
      alert(`Attendance ${type === 'checkin' ? 'Check-In' : 'Check-Out'} successfully recorded.`); 
      fetchLogs(); 
    })
    .catch(err => console.error("Error recording attendance:", err));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in font-sans">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-navy">Attendance Logging</h2>
          <p className="text-xs text-brand-slate font-medium mt-0.5">Record terminal active hours inside corporate perimeter</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => handleAction('checkin')} 
            className="bg-brand-teal text-white font-semibold text-xs px-5 py-3 rounded-xl hover:bg-brand-teal/95 transition-all shadow-md shadow-brand-teal/15 active:scale-[0.98]"
          >
            Check In Terminal
          </button>
          <button 
            onClick={() => handleAction('checkout')} 
            className="bg-brand-navy text-white font-semibold text-xs px-5 py-3 rounded-xl hover:bg-brand-navy/95 transition-all shadow-md shadow-brand-navy/15 active:scale-[0.98]"
          >
            Check Out Terminal
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-bold text-brand-navy">Your Attendance Stream Logs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-lightBg text-[11px] text-brand-slate uppercase font-bold tracking-wider">
                <th className="p-4 pl-6">Date Index</th>
                <th className="p-4">Check In</th>
                <th className="p-4">Check Out</th>
                <th className="p-4 pr-6">Status Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-brand-slate italic font-medium">No attendance records found.</td>
                </tr>
              ) : (
                logs.map(log => (
                  <tr key={log.id} className="hover:bg-brand-lightBg/40 transition duration-150">
                    <td className="p-4 pl-6 font-semibold text-brand-navy">
                      {log.date ? new Date(log.date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-4 text-brand-slate font-medium">{log.check_in || '--:--'}</td>
                    <td className="p-4 text-brand-slate font-medium">{log.check_out || '--:--'}</td>
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