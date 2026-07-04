import React, { useState, useEffect } from "react";

export default function LeaveApproval() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllLeaves = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token") || "test";

      const res = await fetch("http://localhost:5000/api/admin/leaves", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Server Error (${res.status})`);
      }

      const data = await res.json();

      // Supports both [] and { leaves: [] }
      setLeaves(Array.isArray(data) ? data : data.leaves || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load leave requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLeaves();
  }, []);

  const handleDecision = async (id, decision) => {
    const comments = prompt("Enter validation pipeline remarks:");

    if (comments === null) return;

    try {
      const token = localStorage.getItem("token") || "test";

      const res = await fetch(
        `http://localhost:5000/api/admin/leaves/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: decision,
            adminComments: comments,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Update failed (${res.status})`);
      }

      await res.json();

      alert(`Leave request ${decision.toLowerCase()} successfully.`);

      fetchAllLeaves();
    } catch (err) {
      console.error(err);
      alert("Failed to update leave request.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-navyPrimary">
          Global Time-Off Verification Engine
        </h2>
      </div>

      {loading ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">
          Loading leave requests...
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-xl text-center">
          {error}
        </div>
      ) : leaves.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center text-gray-400 italic">
          No active or historical employee leave filings inside logs.
        </div>
      ) : (
        <div className="space-y-4">
          {leaves.map((l) => (
            <div
              key={l.id}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-navyPrimary">
                    {l.name || "Unknown Employee"}
                  </span>

                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                    ID: {l.employee_id || "N/A"}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-1">
                  <b className="text-mintTeal">
                    {l.leave_type || "Unspecified"} Leave
                  </b>
                  {" : "}
                  {l.start_date
                    ? new Date(l.start_date).toLocaleDateString()
                    : "N/A"}
                  {" to "}
                  {l.end_date
                    ? new Date(l.end_date).toLocaleDateString()
                    : "N/A"}
                </p>

                {l.remarks && (
                  <p className="text-xs italic text-gray-400 mt-1">
                    Context: "{l.remarks}"
                  </p>
                )}
              </div>

              {l.status === "Pending" ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecision(l.id, "Approved")}
                    className="bg-mintTeal text-white font-bold text-xs px-4 py-2 rounded hover:opacity-90 transition"
                  >
                    Approve Request
                  </button>

                  <button
                    onClick={() => handleDecision(l.id, "Rejected")}
                    className="bg-red-500 text-white font-bold text-xs px-4 py-2 rounded hover:opacity-90 transition"
                  >
                    Reject Request
                  </button>
                </div>
              ) : (
                <span
                  className={`text-xs px-3 py-1 rounded-full font-bold ${
                    l.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {l.status || "Processed"}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}