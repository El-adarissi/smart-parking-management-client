import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

const Settings = () => {
  const { userinfos, setUserinfos } = useContext(UserContext);
  const [formData, setFormData] = useState({
    vehicleName: userinfos.vehicleName || "",
    ownerName: userinfos.ownerName || "",
    bankNumber: userinfos.bankNumber || "",
    oldPassword: "",
    newPassword: "",
    user_id: userinfos.user_id,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "bankNumber") {
      if (!/^\d*$/.test(value) || value.length > 14) return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${API_BASE_URL}/update-user`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: formData.user_id,
          vehicleName: formData.vehicleName,
          ownerName: formData.ownerName,
          bankNumber: formData.bankNumber,
          oldPassword: formData.oldPassword || null,
          newPassword: formData.newPassword || null,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to update user information");

      const updatedUserInfo = {
        ...userinfos,
        vehicleName: formData.vehicleName,
        ownerName: formData.ownerName,
        bankNumber: formData.bankNumber,
      };
      setUserinfos(updatedUserInfo);
      localStorage.setItem("userInfos", JSON.stringify(updatedUserInfo));

      setFormData((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
      }));

      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Settings</h1>
        <p className="text-neutral-400 mb-4 text-center">Welcome, {userinfos.ownerName}</p>

        <form onSubmit={handleSubmit} className="bg-neutral-800 p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="vehicleName" className="block text-neutral-300 mb-2">Vehicle Name</label>
            <input
              type="text"
              id="vehicleName"
              name="vehicleName"
              value={formData.vehicleName}
              onChange={handleInputChange}
              className="w-full p-2 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="ownerName" className="block text-neutral-300 mb-2">Owner Name</label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleInputChange}
              className="w-full p-2 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="bankNumber" className="block text-neutral-300 mb-2">Bank Number</label>
            <input
              type="text"
              id="bankNumber"
              name="bankNumber"
              value={formData.bankNumber}
              onChange={handleInputChange}
              className="w-full p-2 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter 14-digit bank number"
            />
            {formData.bankNumber.length > 0 && formData.bankNumber.length !== 14 && (
              <p className="text-red-500 text-sm mt-1">Bank number must be exactly 14 digits</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="oldPassword" className="block text-neutral-300 mb-2">
              Old Password (Required if updating password)
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleInputChange}
              className="w-full p-2 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter old password"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-neutral-300 mb-2">
              New Password (Optional)
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="w-full p-2 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Information"}
          </button>

          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          {success && <p className="mt-4 text-green-500 text-center">Information updated successfully!</p>}
        </form>
      </div>
    </div>
  );
};

export default Settings;
