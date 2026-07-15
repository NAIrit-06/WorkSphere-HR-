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
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-brand-navy">
            Leave Approvals Pipeline
          </h2>
          <p className="text-xs text-brand-slate font-medium mt-0.5">Validate employee time-off intents and record comments</p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center text-brand-slate font-medium">
          Loading leave requests...
        </div>
      ) : error ? (
        <div className="bg-red-50/50 border border-red-200 text-red-600 p-6 rounded-2xl text-center font-semibold">
          {error}
        </div>
      ) : leaves.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center text-brand-slate italic font-medium">
          No active or historical employee leave requests recorded.
        </div>
      ) : (
        <div className="space-y-4">
          {leaves.map((l) => (
            <div
              key={l.id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition duration-200"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-base text-brand-navy">
                    {l.name || "Unknown Employee"}
                  </span>

                  <span className="text-[10px] font-mono bg-brand-lightBg text-brand-teal px-2 py-0.5 rounded-md font-bold">
                    ID: {l.employee_id || "N/A"}
                  </span>
                </div>

                <p className="text-sm text-brand-slate font-semibold mt-1.5">
                  Type: <span className="text-brand-teal">{l.leave_type || "Unspecified"} Leave</span>
                  <span className="mx-2 text-gray-300">|</span>
                  Duration: <span className="text-brand-navy">{l.start_date ? new Date(l.start_date).toLocaleDateString() : "N/A"} to {l.end_date ? new Date(l.end_date).toLocaleDateString() : "N/A"}</span>
                </p>

                {l.remarks && (
                  <p className="text-xs italic text-brand-slate/80 bg-brand-lightBg/50 p-2.5 rounded-xl border border-gray-100/50 mt-2.5">
                    Context: "{l.remarks}"
                  </p>
                )}
                
                {l.admin_comments && (
                  <p className="text-xs text-brand-teal font-medium mt-2">
                    Remarks: <span className="italic text-brand-slate">"{l.admin_comments}"</span>
                  </p>
                )}
              </div>

              {l.status === "Pending" ? (
                <div className="flex gap-2.5">
                  <button
                    onClick={() => handleDecision(l.id, "Approved")}
                    className="bg-brand-teal text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-brand-teal/95 shadow-sm shadow-brand-teal/15 transition active:scale-[0.98]"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleDecision(l.id, "Rejected")}
                    className="bg-red-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-red-500/95 shadow-sm shadow-red-500/15 transition active:scale-[0.98]"
                  >
                    Reject
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