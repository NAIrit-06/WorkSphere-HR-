import React, { useState, useEffect } from 'react';

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ 
    employeeId: '', 
    name: '', 
    email: '', 
    password: '', 
    role: 'Employee', 
    jobTitle: '', 
    department: '' 
  });

  const fetchEmployees = () => {
    const token = localStorage.getItem("token") || "test";
    fetch('http://localhost:5000/api/admin/employees', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => setEmployees(Array.isArray(data) ? data : []))
    .catch(err => console.error("Error fetching employees:", err));
  };

  useEffect(() => { 
    fetchEmployees(); 
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || "test";
    fetch('http://localhost:5000/api/admin/employees', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(() => { 
      alert('Employee onboarded successfully.'); 
      // Reset form variables
      setFormData({ 
        employeeId: '', 
        name: '', 
        email: '', 
        password: '', 
        role: 'Employee', 
        jobTitle: '', 
        department: '' 
      }); 
      fetchEmployees(); 
    })
    .catch(err => {
      console.error(err);
      alert('Failed to onboard employee.');
    });
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      {/* Form Container */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-lg mb-4 text-brand-navy">Onboard New Operational Member</h3>
        
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-brand-slate mb-1">Employee ID</label>
            <input 
              type="text" 
              placeholder="e.g. WS-1002" 
              className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all bg-white" 
              value={formData.employeeId} 
              onChange={e => setFormData({...formData, employeeId: e.target.value})} 
              required 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-brand-slate mb-1">Legal Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. Aditi Roy" 
              className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all bg-white" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-brand-slate mb-1">Work Email</label>
            <input 
              type="email" 
              placeholder="name@worksphere.com" 
              className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all bg-white" 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-brand-slate mb-1">Clearance Password</label>
            <input 
              type="password" 
              placeholder="Min 6 characters" 
              className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all bg-white" 
              value={formData.password} 
              onChange={e => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-brand-slate mb-1">Designation</label>
            <input 
              type="text" 
              placeholder="e.g. Senior Architect" 
              className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all bg-white" 
              value={formData.jobTitle} 
              onChange={e => setFormData({...formData, jobTitle: e.target.value})} 
              required 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-brand-slate mb-1">Department</label>
            <input 
              type="text" 
              placeholder="e.g. Engineering" 
              className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all bg-white" 
              value={formData.department} 
              onChange={e => setFormData({...formData, department: e.target.value})} 
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="md:col-span-3 bg-brand-navy hover:bg-brand-navy/95 text-white text-sm font-semibold rounded-xl py-3 shadow-md transition-all active:scale-[0.99] duration-150 mt-2"
          >
            Register Core Employee Node
          </button>
        </form>
      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h4 className="font-bold text-brand-navy">Core registry base</h4>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-lightBg text-[11px] text-brand-slate uppercase font-bold tracking-wider">
                <th className="p-4 pl-6">Employee ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4 pr-6">Allocation Designation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-brand-slate italic font-medium">No registered employees in database.</td>
                </tr>
              ) : (
                employees.map(emp => (
                  <tr key={emp.id} className="hover:bg-brand-lightBg/40 transition duration-150">
                    <td className="p-4 pl-6 font-mono font-bold text-brand-teal">{emp.employee_id}</td>
                    <td className="p-4 font-semibold text-brand-navy">{emp.name}</td>
                    <td className="p-4 text-brand-slate font-medium">{emp.email}</td>
                    <td className="p-4 pr-6">
                      <span className="inline-block px-3 py-1 bg-brand-teal/10 rounded-full text-xs font-semibold text-brand-teal">
                        {emp.job_title} ({emp.department})
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