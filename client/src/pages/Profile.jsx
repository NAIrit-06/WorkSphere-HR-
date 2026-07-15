import React, { useState, useEffect } from "react";

export default function Profile({ user }) {
  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    profile_picture: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token") || "test";
        const response = await fetch(
          "http://localhost:5000/api/employee/profile",
          {
            headers: {
              "x-user-id": user?.id || "2",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data);

        setFormData({
          phone: data.phone || "",
          address: data.address || "",
          profile_picture: data.profile_picture || "",
        });
      } catch (error) {
        console.error(error);
        alert("Unable to load profile.");
      }
    };

    fetchProfile();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token") || "test";
      const response = await fetch(
        "http://localhost:5000/api/employee/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user?.id || "2",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      const updatedProfile = {
        ...profile,
        ...formData,
      };

      setProfile(updatedProfile);
      alert("Profile details updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
  };

  if (!profile) {
    return (
      <div className="text-center py-10 font-bold text-brand-navy">
        Extracting profile registry node...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in font-sans">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition duration-200">
        <div className="relative h-36 bg-gradient-to-r from-brand-navy to-brand-teal/80">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        </div>

        <div className="relative flex flex-col items-start gap-6 px-8 pb-8 md:flex-row border-b border-gray-50">
          <img
            src={
              profile.profile_picture ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
            }
            alt="Avatar"
            className="-mt-16 h-32 w-32 rounded-2xl border-4 border-white bg-white object-cover shadow-md"
          />

          <div className="mt-4 flex-1 md:mt-0">
            <h2 className="text-2xl font-extrabold text-brand-navy">
              {profile.name}
            </h2>

            <p className="font-semibold text-brand-teal mt-0.5">
              {profile.job_title} • {profile.department}
            </p>

            <span className="mt-2.5 inline-block rounded-full bg-brand-lightBg px-3 py-1 text-xs font-bold text-brand-teal font-mono border border-brand-teal/10">
              Clearance Scope: {profile.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-brand-navy">
              Core Registry Parameters
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-gray-100 py-2">
                <span className="text-brand-slate font-semibold">Employee ID</span>
                <span className="font-bold text-brand-navy font-mono">
                  {profile.employee_id}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-100 py-2">
                <span className="text-brand-slate font-semibold">System Access Scope</span>
                <span className="font-bold text-brand-navy">
                  {profile.role}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-100 py-2">
                <span className="text-brand-slate font-semibold">Registered Email</span>
                <span className="font-semibold text-brand-teal">
                  {profile.email}
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy">
              Update Profile variables
            </h3>

            <div>
              <label className="mb-1 block text-xs font-semibold text-brand-slate">
                Contact Phone
              </label>
              <input
                type="text"
                placeholder="e.g. +91 98765 43210"
                className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all bg-white"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-brand-slate">
                Profile Image URL
              </label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all bg-white"
                value={formData.profile_picture}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    profile_picture: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-brand-slate">
                Residential Address Space
              </label>
              <textarea
                rows="3"
                placeholder="Enter physical address..."
                className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all bg-white"
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
              />
            </div>

            <button
              type="submit"
              className="bg-brand-navy hover:bg-brand-navy/95 text-white text-xs font-bold rounded-xl px-5 py-3 shadow-md transition active:scale-[0.98]"
            >
              Commit Field Modifications
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}