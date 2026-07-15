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
      setFormData({ leaveType: 'Paid', startDate: '', endDate: '', remarks: '' });
      fetchLeaves(); 
    })
    .catch(err => console.error("Error submitting leave:", err));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in font-sans">
      {/* Leave Application Form */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
        <h3 className="font-bold text-lg mb-4 text-brand-navy">File Leave Intent</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-brand-slate mb-1">Leave Category</label>
            <select 
              className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all bg-white cursor-pointer" 
              value={formData.leaveType} 
              onChange={e => setFormData({...formData, leaveType: e.target.value})}
            >
              <option value="Paid">Paid Time Off</option>
              <option value="Sick">Medical Sick Leave</option>
              <option value="Unpaid">Unpaid Leave</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-brand-slate mb-1">Start Date</label>
            <input 
              type="date" 
              className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all bg-white" 
              value={formData.startDate} 
              onChange={e => setFormData({...formData, startDate: e.target.value})} 
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-brand-slate mb-1">End Date</label>
            <input 
              type="date" 
              className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all bg-white" 
              value={formData.endDate} 
              onChange={e => setFormData({...formData, endDate: e.target.value})} 
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-brand-slate mb-1">Remarks / Justification</label>
            <textarea 
              className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all bg-white" 
              rows="3" 
              value={formData.remarks} 
              onChange={e => setFormData({...formData, remarks: e.target.value})}
              placeholder="Provide context remarks..."
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-brand-navy hover:bg-brand-navy/95 text-white text-xs py-3 rounded-xl font-bold transition-all shadow-md shadow-brand-navy/15 active:scale-[0.98] mt-2"
          >
            Submit to HR Pipeline
          </button>
        </form>
      </div>

      {/* Leave Logs Stream */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
        <h3 className="font-bold text-lg mb-4 text-brand-navy">Time-Off Verification Logs</h3>
        <div className="space-y-4">
          {leaves.length === 0 ? (
            <p className="text-sm text-brand-slate italic text-center py-10 font-medium">No historical leave requests recorded.</p>
          ) : (
            leaves.map(l => (
              <div key={l.id} className="border border-gray-100 p-4 rounded-xl flex justify-between items-center bg-brand-lightBg/30 hover:bg-white transition shadow-sm hover:shadow-md">
                <div>
                  <span className="text-sm font-bold block text-brand-navy">{l.leave_type} Leave Block</span>
                  <span className="text-xs text-brand-slate font-medium">
                    Duration: {l.start_date ? new Date(l.start_date).toLocaleDateString() : 'N/A'} to {l.end_date ? new Date(l.end_date).toLocaleDateString() : 'N/A'}
                  </span>
                  {l.remarks && <p className="text-xs italic text-brand-slate/85 mt-2 bg-white px-2.5 py-1.5 rounded-lg border border-gray-100">"{l.remarks}"</p>}
                  
                  {l.admin_comments && (
                    <p className="text-xs text-brand-teal font-semibold mt-1">
                      HR comments: <span className="italic text-brand-slate font-medium">"{l.admin_comments}"</span>
                    </p>
                  )}
                </div>
                <span className={`text-[11px] px-3 py-1 rounded-full font-bold ${
                  l.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                  l.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {l.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
