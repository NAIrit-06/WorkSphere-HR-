import React, { useState, useEffect } from 'react';

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ employeeId: '', name: '', email: '', password: '', role: 'Employee', jobTitle: '', department: '' });

  const fetchEmployees = () => {
    fetch('http://localhost:5000/api/admin/employees').then(res => res.json()).then(data => setEmployees(data));
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/admin/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(() => { alert('Employee pipeline setup complete.'); fetchEmployees(); });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-lg mb-4 text-brand-navy">Onboard New Operational Member</h3>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Employee Token ID" className="border p-2 rounded text-sm" value={formData.employeeId} onChange={e => setFormData({...formData, employeeId: e.target.value})} required />
          <input type="text" placeholder="Full Legal Name" className="border p-2 rounded text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          <input type="email" placeholder="Corporate Node Email" className="border p-2 rounded text-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          <input type="password" placeholder="Initial System Password" className="border p-2 rounded text-sm" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
          <input type="text" placeholder="Job Title" className="border p-2 rounded text-sm" value={formData.jobTitle} onChange={e => setFormData({...formData, jobTitle: e.target.value})} required />
          <input type="text" placeholder="Department Allocation" className="border p-2 rounded text-sm" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} required />
          <button type="submit" className="bg-brand-teal text-white text-xs font-bold rounded py-2 md:col-span-3 hover:bg-opacity-90 transition">Commit New Node to Core Registry</button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-400 uppercase font-semibold">
              <th className="p-4">Employee ID</th><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Designation</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {employees.map(emp => (
              <tr key={emp.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-bold text-brand-navy">{emp.employee_id}</td>
                <td className="p-4">{emp.name}</td>
                <td className="p-4 text-gray-500">{emp.email}</td>
                <td className="p-4 font-medium text-brand-teal">{emp.job_title} ({emp.department})</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}