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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navyPrimary">Attendance Logging Terminal</h2>
          <p className="text-xs text-gray-400 mt-0.5">Record terminal active hours inside corporate perimeter</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => handleAction('checkin')} 
            className="bg-mintTeal text-white font-bold text-xs px-5 py-2.5 rounded hover:bg-opacity-90 transition shadow-sm"
          >
            Execute Terminal Check-In
          </button>
          <button 
            onClick={() => handleAction('checkout')} 
            className="bg-navyPrimary text-white font-bold text-xs px-5 py-2.5 rounded hover:bg-opacity-90 transition shadow-sm"
          >
            Execute Terminal Check-Out
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="font-bold text-navyPrimary">Terminal Tracking Stream View</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-400 uppercase font-semibold">
                <th className="p-4">Date Index</th>
                <th className="p-4">Check In</th>
                <th className="p-4">Check Out</th>
                <th className="p-4">Status Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-400 italic">No attendance records found.</td>
                </tr>
              ) : (
                logs.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50 transition">
                    <td className="p-4 font-medium">
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
    </div>
  );
}