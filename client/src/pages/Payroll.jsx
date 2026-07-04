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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-1 text-navyPrimary">
          Financial Payroll Ledger
        </h2>

        <p className="text-xs text-red-500 font-semibold tracking-wide">
          🔒 Read-Only Terminal Mode Enabled. Context secured by cryptographic
          policy.
        </p>
      </div>

      {loading ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">
          Loading payroll records...
        </div>
      ) : error ? (
        <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-center text-red-600">
          {error}
        </div>
      ) : payrolls.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center text-gray-400 italic">
          No generated pay slips found for this account.
        </div>
      ) : (
        <div className="space-y-4">
          {payrolls.map((p) => (
            <div
              key={p.id}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4 items-center hover:shadow-md transition"
            >
              <div>
                <span className="text-xs text-gray-400 block font-medium">
                  Processing Month
                </span>
                <span className="font-bold text-navyPrimary">
                  {p.month_year}
                </span>
              </div>

              <div>
                <span className="text-xs text-gray-400 block font-medium">
                  Base Allocation
                </span>
                <span className="font-semibold text-gray-700">
                  ₹{formatCurrency(p.base_salary || 0)}
                </span>
              </div>

              <div>
                <span className="text-xs text-gray-400 block font-medium">
                  Net Disbursed
                </span>
                <span className="font-extrabold text-mintTeal">
                  ₹{formatCurrency(p.net_salary || 0)}
                </span>
              </div>

              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    p.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
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