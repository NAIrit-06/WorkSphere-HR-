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
        const response = await fetch(
          "http://localhost:5000/api/employee/profile",
          {
            headers: {
              "x-user-id": user?.id || "2",
              Authorization: "Bearer test",
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
      const response = await fetch(
        "http://localhost:5000/api/employee/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user?.id || "2",
            Authorization: "Bearer test",
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
      <div className="text-center py-10 font-medium">
        Extracting profile structure...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="relative h-32 bg-brand-navy"></div>

        <div className="relative flex flex-col items-start gap-8 px-8 pb-8 md:flex-row">
          <img
            src={
              profile.profile_picture ||
              "https://via.placeholder.com/150"
            }
            alt="Avatar"
            className="-mt-16 h-32 w-32 rounded-2xl border-4 border-white bg-white object-cover shadow-md"
          />

          <div className="mt-4 flex-1 md:mt-0">
            <h2 className="text-2xl font-bold">
              {profile.name}
            </h2>

            <p className="font-semibold text-brand-teal">
              {profile.job_title} • {profile.department}
            </p>

            <span className="mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              Token ID: {profile.employee_id}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-gray-50 p-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-navy">
              Core Corporate Matrix
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b py-2">
                <span className="text-gray-400">System ID</span>
                <span className="font-medium">
                  {profile.employee_id}
                </span>
              </div>

              <div className="flex justify-between border-b py-2">
                <span className="text-gray-400">Security Scope</span>
                <span className="font-medium">
                  {profile.role}
                </span>
              </div>

              <div className="flex justify-between border-b py-2">
                <span className="text-gray-400">Node Email</span>
                <span className="font-medium">
                  {profile.email}
                </span>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleUpdate}
            className="space-y-4"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-navy">
              Editable Variables
            </h3>

            <div>
              <label className="mb-1 block text-xs text-gray-400">
                Contact Phone
              </label>

              <input
                type="text"
                className="w-full rounded border px-3 py-2 text-sm focus:outline-brand-teal"
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
              <label className="mb-1 block text-xs text-gray-400">
                Physical Address Space
              </label>

              <textarea
                rows="3"
                className="w-full rounded border px-3 py-2 text-sm focus:outline-brand-teal"
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
              className="rounded bg-brand-navy px-4 py-2 text-xs font-bold text-white transition hover:opacity-90"
            >
              Commit Field Modifications
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}