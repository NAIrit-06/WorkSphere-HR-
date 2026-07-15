import React, { useState, useEffect } from 'react';

export default function PayrollManagement() {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    userId: '',
    monthYear: '2026-07',
    baseSalary: '',
    allowances: '',
    deductions: '',
    status: 'Unpaid'
  });

  const fetchEmployeesAndPayroll = () => {
    const token = localStorage.getItem("token") || "test";
    
    fetch('http://localhost:5000/api/admin/employees', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        const empList = Array.isArray(data) ? data : [];
        setEmployees(empList);
        if (empList.length > 0) {
          setFormData(prev => ({
            ...prev,
            userId: empList[0].id
          }));
        }
      })
      .catch(err => console.error(err));

    fetch('http://localhost:5000/api/admin/payroll', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setRecords(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchEmployeesAndPayroll();
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || "test";

    fetch('http://localhost:5000/api/admin/payroll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(() => {
        alert('Salary architecture metrics adjusted successfully.');
        setFormData(prev => ({
          ...prev,
          baseSalary: '',
          allowances: '',
          deductions: '',
          status: 'Unpaid'
        }));
        return fetch('http://localhost:5000/api/admin/payroll', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      })
      .then(res => res.json())
      .then(data => setRecords(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error(err);
        alert('Failed to update payroll.');
      });
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      {/* Form Container */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-lg mb-4 text-brand-navy">
          Modify Target Salary Structure Matrix
        </h3>

        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-brand-slate mb-1">Target Employee</label>
            <select
              className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all bg-white cursor-pointer"
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            >
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} ({emp.employee_id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-slate mb-1">Processing Month (YYYY-MM)</label>
            <input
              type="text"
              placeholder="e.g. 2026-07"
              className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all bg-white"
              value={formData.monthYear}
              onChange={(e) => setFormData({ ...formData, monthYear: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-slate mb-1">Base Salary Allocation (₹)</label>
            <input
              type="number"
              placeholder="e.g. 45000"
              className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all bg-white"
              value={formData.baseSalary}
              onChange={(e) => setFormData({ ...formData, baseSalary: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-slate mb-1">Allowances (₹)</label>
            <input
              type="number"
              placeholder="e.g. 5000"
              className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all bg-white"
              value={formData.allowances}
              onChange={(e) => setFormData({ ...formData, allowances: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-slate mb-1">Deductions (₹)</label>
            <input
              type="number"
              placeholder="e.g. 2000"
              className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all bg-white"
              value={formData.deductions}
              onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-slate mb-1">Payment Status</label>
            <select
              className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all bg-white cursor-pointer"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Unpaid">Unpaid Status</option>
              <option value="Paid">Disbursed Paid Status</option>
            </select>
          </div>

          <button
            type="submit"
            className="md:col-span-3 bg-brand-navy hover:bg-brand-navy/95 text-white text-sm font-semibold rounded-xl py-3 shadow-md transition-all active:scale-[0.99] duration-150 mt-2"
          >
            Commit Ledger Adjustments
          </button>
        </form>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h4 className="font-bold text-brand-navy">Payroll processing log</h4>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-lightBg text-[11px] text-brand-slate uppercase font-bold tracking-wider">
                <th className="p-4 pl-6">Target Employee</th>
                <th className="p-4">Month Index</th>
                <th className="p-4">Base Allocation</th>
                <th className="p-4">Calculated Net Total</th>
                <th className="p-4 pr-6">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {records.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-brand-slate italic font-medium">No payroll slips calculated yet.</td>
                </tr>
              ) : (
                records.map(rec => (
                  <tr key={rec.id} className="hover:bg-brand-lightBg/40 transition duration-150">
                    <td className="p-4 pl-6">
                      <span className="font-semibold block text-brand-navy">
                        {rec.name}
                      </span>
                      <span className="text-xs font-mono font-bold text-brand-teal">
                        ID: {rec.employee_id}
                      </span>
                    </td>

                    <td className="p-4 font-semibold text-brand-slate">{rec.month_year}</td>

                    <td className="p-4 text-brand-navy font-medium">
                      ₹{Number(rec.base_salary).toLocaleString('en-IN')}
                    </td>

                    <td className="p-4 font-bold text-brand-teal">
                      ₹{Number(rec.net_salary).toLocaleString('en-IN')}
                    </td>

                    <td className="p-4 pr-6">
                      <span
                        className={`inline-block text-xs px-3 py-1 rounded-full font-bold ${
                          rec.status === 'Paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {rec.status}
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