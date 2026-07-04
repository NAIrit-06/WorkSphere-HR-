import React, { useState, useEffect } from 'react';

export default function Leave({ user }) {
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({ leaveType: 'Paid', startDate: '', endDate: '', remarks: '' });

  const fetchLeaves = () => {
    const token = localStorage.getItem("token") || "test";
    fetch('http://localhost:5000/api/employee/leave', {
      headers: { 
        'x-user-id': user?.id || '2', 
        'Authorization': `Bearer ${token}` 
      }
    })
    .then(res => res.json())
    .then(data => setLeaves(Array.isArray(data) ? data : []))
    .catch(err => console.error("Error fetching leaves:", err));
  };

  useEffect(() => { 
    fetchLeaves(); 
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || "test";
    fetch('http://localhost:5000/api/employee/leave', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'x-user-id': user?.id || '2', 
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(() => { 
      alert('Leave application submitted successfully.'); 
      setFormData({ leaveType: 'Paid', startDate: '', endDate: '', remarks: '' }); // Clears form fields after submit
      fetchLeaves(); 
    })
    .catch(err => console.error("Error submitting leave:", err));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Leave Application Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
        <h3 className="font-bold text-lg mb-4 text-navyPrimary">File Leave Intent</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Leave Category Token</label>
            <select 
              className="w-full border p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-mintTeal" 
              value={formData.leaveType} 
              onChange={e => setFormData({...formData, leaveType: e.target.value})}
            >
              <option value="Paid">Paid Time Off</option>
              <option value="Sick">Medical Sick Leave</option>
              <option value="Unpaid">Unpaid Structure</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Target Dimension Entry Date</label>
            <input 
              type="date" 
              className="w-full border p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-mintTeal" 
              value={formData.startDate} 
              onChange={e => setFormData({...formData, startDate: e.target.value})} 
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Target Dimension Termination Date</label>
            <input 
              type="date" 
              className="w-full border p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-mintTeal" 
              value={formData.endDate} 
              onChange={e => setFormData({...formData, endDate: e.target.value})} 
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Context Remarks</label>
            <textarea 
              className="w-full border p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-mintTeal" 
              rows="3" 
              value={formData.remarks} 
              onChange={e => setFormData({...formData, remarks: e.target.value})}
              placeholder="Provide justification..."
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-navyPrimary text-white text-xs py-2.5 rounded font-bold hover:bg-opacity-90 transition shadow-sm"
          >
            Submit to HR Matrix
          </button>
        </form>
      </div>

      {/* Leave Logs Stream */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
        <h3 className="font-bold text-lg mb-4 text-navyPrimary">Time-Off Verification Logs</h3>
        <div className="space-y-4">
          {leaves.length === 0 ? (
            <p className="text-sm text-gray-400 italic text-center py-6">No historical leave requests recorded.</p>
          ) : (
            leaves.map(l => (
              <div key={l.id} className="border p-4 rounded-lg flex justify-between items-center bg-gray-50 hover:bg-white transition shadow-sm">
                <div>
                  <span className="text-sm font-bold block text-navyPrimary">{l.leave_type || l.leave_type} Leave Block</span>
                  <span className="text-xs text-gray-400">
                    {l.start_date ? new Date(l.start_date).toLocaleDateString() : 'N/A'} to {l.end_date ? new Date(l.end_date).toLocaleDateString() : 'N/A'}
                  </span>
                  {l.remarks && <p className="text-xs italic text-gray-500 mt-1">"{l.remarks}"</p>}
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-extrabold ${
                  l.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                  l.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {l.status || 'Pending'}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
