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

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/employees')
      .then(res => res.json())
      .then(data => {
        setEmployees(data);
        if (data.length > 0) {
          setFormData(prev => ({
            ...prev,
            userId: data[0].id
          }));
        }
      });

    fetch('http://localhost:5000/api/admin/payroll')
      .then(res => res.json())
      .then(data => setRecords(data));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/admin/payroll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(() => {
        alert('Salary architecture metrics adjusted successfully.');

        return fetch('http://localhost:5000/api/admin/payroll');
      })
      .then(res => res.json())
      .then(data => setRecords(data))
      .catch(err => {
        console.error(err);
        alert('Failed to update payroll.');
      });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-lg mb-4 text-brand-navy">
          Modify Target Salary Structure Matrix
        </h3>

        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <select
            className="border p-2 rounded text-sm"
            value={formData.userId}
            onChange={(e) =>
              setFormData({ ...formData, userId: e.target.value })
            }
          >
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.name} ({emp.employee_id})
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Processing Month (YYYY-MM)"
            className="border p-2 rounded text-sm"
            value={formData.monthYear}
            onChange={(e) =>
              setFormData({ ...formData, monthYear: e.target.value })
            }
            required
          />

          <input
            type="number"
            placeholder="Base Allocation Value"
            className="border p-2 rounded text-sm"
            value={formData.baseSalary}
            onChange={(e) =>
              setFormData({ ...formData, baseSalary: e.target.value })
            }
            required
          />

          <input
            type="number"
            placeholder="Allowances"
            className="border p-2 rounded text-sm"
            value={formData.allowances}
            onChange={(e) =>
              setFormData({ ...formData, allowances: e.target.value })
            }
            required
          />

          <input
            type="number"
            placeholder="Deductions"
            className="border p-2 rounded text-sm"
            value={formData.deductions}
            onChange={(e) =>
              setFormData({ ...formData, deductions: e.target.value })
            }
            required
          />

          <select
            className="border p-2 rounded text-sm"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="Unpaid">Unpaid Status</option>
            <option value="Paid">Disbursed Paid Status</option>
          </select>

          <button
            type="submit"
            className="bg-brand-navy text-white text-xs font-bold rounded py-2 md:col-span-3 hover:bg-opacity-90 transition"
          >
            Commit Ledger Adjustments
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-400 uppercase font-semibold">
              <th className="p-4">Target Employee</th>
              <th className="p-4">Month Index</th>
              <th className="p-4">Base Allocation</th>
              <th className="p-4">Calculated Net Total</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y text-sm">
            {records.map(rec => (
              <tr key={rec.id} className="hover:bg-gray-50 transition">
                <td className="p-4">
                  <span className="font-bold block text-brand-navy">
                    {rec.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    ID: {rec.employee_id}
                  </span>
                </td>

                <td className="p-4 font-medium">{rec.month_year}</td>

                <td className="p-4">
                  ₹{Number(rec.base_salary).toLocaleString()}
                </td>

                <td className="p-4 font-bold text-brand-teal">
                  ₹{Number(rec.net_salary).toLocaleString()}
                </td>

                <td className="p-4">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                      rec.status === 'Paid'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {rec.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}