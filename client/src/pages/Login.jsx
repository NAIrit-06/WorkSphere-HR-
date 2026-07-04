import React, { useState } from "react";

export default function Login({ setUser, navigateTo }) {
  const [isSignUp, setIsSignUp] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    password: "",
    role: "Employee",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const endpoint = isSignUp
      ? "/api/auth/signup"
      : "/api/auth/login";

    try {
      const response = await fetch(
        `http://localhost:5000${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(
          data.error || "System access failed."
        );
        return;
      }

      if (isSignUp) {
        alert(
          "Registration complete! Please login with your credentials."
        );

        setFormData({
          employeeId: "",
          name: "",
          email: "",
          password: "",
          role: "Employee",
        });

        setIsSignUp(false);
      } else {
        setUser(data.user);

        if (data.user.role === "Admin") {
          navigateTo("AdminDashboard");
        } else {
          navigateTo("EmployeeDashboard");
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(
        "Unable to connect to the server. Please ensure the backend is running."
      );
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-brand-lightBg">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-10 shadow-xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-brand-navy">
            {isSignUp ? "Create Workspace" : "Sign In"}
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Access your operational node dashboard
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-brand-navy">
                  Employee Unique ID
                </label>

                <input
                  type="text"
                  required
                  className="w-full rounded-lg border px-3 py-2 focus:outline-brand-teal"
                  value={formData.employeeId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      employeeId: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-brand-navy">
                  Full Legal Name
                </label>

                <input
                  type="text"
                  required
                  className="w-full rounded-lg border px-3 py-2 focus:outline-brand-teal"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
              </div>
            </>
          )}

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-brand-navy">
              Work Email Address
            </label>

            <input
              type="email"
              required
              className="w-full rounded-lg border px-3 py-2 focus:outline-brand-teal"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-brand-navy">
              Account Password
            </label>

            <input
              type="password"
              required
              className="w-full rounded-lg border px-3 py-2 focus:outline-brand-teal"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
          </div>

          {isSignUp && (
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-brand-navy">
                Functional Enterprise Role
              </label>

              <select
                className="w-full rounded-lg border px-3 py-2 focus:outline-brand-teal"
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value,
                  })
                }
              >
                <option value="Employee">
                  Employee Portal Token
                </option>

                <option value="Admin">
                  HR Administrator Access
                </option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-brand-navy py-2.5 font-bold text-white transition hover:opacity-90"
          >
            {isSignUp
              ? "Initialize Profile"
              : "Authenticate Security Token"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setErrorMessage("");
              setIsSignUp(!isSignUp);
            }}
            className="text-xs font-semibold text-brand-teal hover:underline"
          >
            {isSignUp
              ? "Already mapped? Access login system"
              : "New onboarding context? Register terminal node"}
          </button>
        </div>
      </div>
    </div>
  );
}