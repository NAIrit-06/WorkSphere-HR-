import React, { useState } from "react";
import Logo from "./Logo";

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
        // Securely store the authentication token & session user context
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
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
    <div className="relative h-screen w-screen flex items-center justify-center bg-brand-lightBg overflow-hidden font-sans">
      {/* Futuristic glow elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-teal/10 blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-navy/10 blur-[120px]"></div>

      <div className="w-full max-w-md rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl p-10 shadow-2xl z-10 animate-fade-in">
        <div className="mb-8 text-center flex flex-col items-center">
          <Logo className="w-16 h-16 mb-4" />
          
          <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight">
            {isSignUp ? "Join WorkSphere" : "Access Terminal"}
          </h2>

          <p className="mt-2 text-sm text-brand-slate font-medium">
            {isSignUp ? "Initialize your corporate workspace node" : "Authenticate security clearance token"}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50/50 backdrop-blur px-4 py-3 text-sm font-semibold text-red-600 flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-brand-navy">
                  Unique ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. WS-1002"
                  className="w-full rounded-lg border border-gray-200 bg-white/50 px-3 py-2 text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all"
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
                <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-brand-navy">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Legal name"
                  className="w-full rounded-lg border border-gray-200 bg-white/50 px-3 py-2 text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}

          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-brand-navy">
              Corporate Email
            </label>
            <input
              type="email"
              required
              placeholder="name@worksphere.com"
              className="w-full rounded-lg border border-gray-200 bg-white/50 px-3 py-2 text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all"
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
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-brand-navy">
              Clearance Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-200 bg-white/50 px-3 py-2 text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all"
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
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-brand-navy">
                Enterprise Role Type
              </label>
              <select
                className="w-full rounded-lg border border-gray-200 bg-white/50 px-3 py-2 text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all cursor-pointer"
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value,
                  })
                }
              >
                <option value="Employee">Employee Node Clearance</option>
                <option value="Admin">HR Administrator Clearance</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-brand-navy py-2.5 font-semibold text-white tracking-wide shadow-md transition hover:bg-brand-navy/95 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-teal active:scale-[0.99] duration-150"
          >
            {isSignUp
              ? "Initialize Member Node"
              : "Authenticate Token"}
          </button>
        </form>

        <div className="mt-8 border-t border-gray-200/50 pt-5 text-center">
          <button
            type="button"
            onClick={() => {
              setErrorMessage("");
              setIsSignUp(!isSignUp);
            }}
            className="text-xs font-semibold text-brand-teal hover:text-brand-teal/90 transition-all hover:underline"
          >
            {isSignUp
              ? "Registered node already? Access terminal login"
              : "New connection context? Register employee profile"}
          </button>
        </div>
      </div>
    </div>
  );
}