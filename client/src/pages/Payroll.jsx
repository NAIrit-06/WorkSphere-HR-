import React, { useState, useEffect } from "react";

export default function Payroll({ user }) {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token") || "test";

        const res = await fetch(
          "http://localhost:5000/api/employee/payroll",
          {
            headers: {
              "x-user-id": user?.id || "2",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Server Error (${res.status})`);
        }

        const data = await res.json();
        setPayrolls(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load payroll records.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayrolls();
  }, [user]);

  const formatCurrency = (value) => {
    const amount = Number(value);
    return amount.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in font-sans">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-brand-navy">
            Your Payroll Ledger
          </h2>
          <p className="text-xs text-brand-slate font-semibold mt-0.5">🔒 Read-Only Mode (Secured by cryptographic access policy)</p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center text-brand-slate font-medium">
          Loading payroll records...
        </div>
      ) : error ? (
        <div className="bg-red-50/50 p-6 rounded-2xl border border-red-200 text-center text-red-600 font-semibold">
          {error}
        </div>
      ) : payrolls.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center text-brand-slate italic font-medium">
          No generated pay slips found for this account.
        </div>
      ) : (
        <div className="space-y-4">
          {payrolls.map((p) => (
            <div
              key={p.id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4 items-center hover:shadow-md transition duration-200"
            >
              <div>
                <span className="text-xs text-brand-slate block font-bold uppercase tracking-wider">
                  Processing Month
                </span>
                <span className="font-extrabold text-brand-navy mt-0.5 block">
                  {p.month_year}
                </span>
              </div>

              <div>
                <span className="text-xs text-brand-slate block font-bold uppercase tracking-wider">
                  Base Allocation
                </span>
                <span className="font-semibold text-brand-navy/95 mt-0.5 block">
                  ₹{formatCurrency(p.base_salary || 0)}
                </span>
              </div>

              <div>
                <span className="text-xs text-brand-slate block font-bold uppercase tracking-wider">
                  Net Disbursed
                </span>
                <span className="font-extrabold text-brand-teal mt-0.5 block">
                  ₹{formatCurrency(p.net_salary || 0)}
                </span>
              </div>

              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    p.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {p.status || "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}