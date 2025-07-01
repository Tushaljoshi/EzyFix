import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const preferenceOptions = [
  "Food & Dining",
  "Fashion & Apparel",
  "Travel & Experience",
  "Health & Wellness",
  "Fitness & Services",
];

const Profile = () => {
  const [preferences, setPreferences] = useState([]);
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    const storedPrefs = JSON.parse(localStorage.getItem("preferences"));
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (storedPrefs) setPreferences(storedPrefs);
    if (storedUser) {
      setUser(storedUser);
      setEditedUser(storedUser);
    } else {
      setUser(null);
    }
  }, []);

  const togglePreference = (pref) => {
    setPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const savePreferences = () => {
    localStorage.setItem("preferences", JSON.stringify(preferences));
    alert("Preferences saved!");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedUser = { ...user, avatar: reader.result };
      setUser(updatedUser);
      setEditedUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setUser(editedUser);
    localStorage.setItem("user", JSON.stringify(editedUser));
    localStorage.setItem("loggedInUser", JSON.stringify(editedUser));
    setEditMode(false);
    alert("Profile updated!");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

        {/* Top Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <label className="relative group">
              <img
                src={user?.avatar || "https://via.placeholder.com/150"}
                alt="User"
                className="w-16 h-16 rounded-full object-cover border cursor-pointer hover:opacity-80"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition text-xs text-white rounded-full">
                Change
              </div>
            </label>
            <div>
              {editMode ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name || ""}
                    onChange={handleInputChange}
                    className="text-lg font-semibold border px-2 py-1 rounded w-full"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email || ""}
                    onChange={handleInputChange}
                    className="text-sm text-gray-500 border px-2 py-1 rounded w-full mt-1"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold">{user?.name || "Guest User"}</h2>
                  <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
                </>
              )}
              <p className="text-xs text-gray-400">
                ID: {user?.id || "00000"} • Wallet: {user?.wallet || "₹0.00"}
              </p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 space-x-2">
            {editMode ? (
              <button
                onClick={handleSaveProfile}
                className="bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-brandBlue text-white text-sm px-4 py-2 rounded hover:bg-[#2DA7ED]"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Settings + Wallet */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-gray-600">Change Password</label>
                <input type="password" className="w-full px-4 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-600">Bank/UPI for refunds</label>
                <input type="text" className="w-full px-4 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-600">Privacy Settings</label>
                <select className="w-full px-4 py-2 border rounded-md">
                  <option>Public</option>
                  <option>Private</option>
                  <option>Only Me</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Add Money to Wallet</h3>
            <input
              type="number"
              placeholder="Enter amount"
              value={editedUser.walletAmount || ""}
              onChange={(e) =>
                setEditedUser((prev) => ({
                  ...prev,
                  walletAmount: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border rounded-md mb-4"
            />

            <select
              value={editedUser.paymentMethod || ""}
              onChange={(e) =>
                setEditedUser((prev) => ({
                  ...prev,
                  paymentMethod: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border rounded-md mb-4"
            >
              <option value="">Select Payment Method</option>
              <option value="gpay">Google Pay</option>
              <option value="upi">UPI</option>
              <option value="paypal">PayPal</option>
            </select>

            {editedUser.paymentMethod === "gpay" && (
              <input
                type="text"
                placeholder="Google Pay UPI ID"
                className="w-full px-4 py-2 border rounded-md mb-4"
                required
              />
            )}
            {editedUser.paymentMethod === "upi" && (
              <input
                type="text"
                placeholder="Enter UPI ID"
                className="w-full px-4 py-2 border rounded-md mb-4"
                required
              />
            )}
            {editedUser.paymentMethod === "paypal" && (
              <input
                type="email"
                placeholder="PayPal Email"
                className="w-full px-4 py-2 border rounded-md mb-4"
                required
              />
            )}

            <button
              onClick={() => {
                const amount = parseFloat(editedUser.walletAmount);
                if (!amount || amount <= 0) {
                  alert("Enter a valid amount.");
                  return;
                }
                if (!editedUser.paymentMethod) {
                  alert("Please select a payment method.");
                  return;
                }

                const updated = {
                  ...editedUser,
                  wallet: `₹${(
                    parseFloat(user?.wallet?.replace("₹", "") || 0) +
                    amount
                  ).toFixed(2)}`,
                };

                setUser(updated);
                setEditedUser(updated);
                localStorage.setItem("user", JSON.stringify(updated));
                localStorage.setItem("loggedInUser", JSON.stringify(updated));
                alert("Amount added successfully!");
              }}
              className="w-full bg-brandBlue text-white py-2 rounded hover:bg-[#2DA7ED]"
            >
              Add Now
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg mb-4 text-gray-800">Coupon Preferences</h3>
          <p className="text-sm text-gray-500 mb-6">Choose the categories you're most interested in:</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {preferenceOptions.map((pref, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gray-50 border hover:border-brandBlue rounded-lg px-4 py-2 transition"
              >
                <span className="text-sm font-medium text-gray-700">{pref}</span>
                <label className="relative inline-flex items-center cursor-pointer w-11 h-6">
                  <input
                    type="checkbox"
                    checked={preferences.includes(pref)}
                    onChange={() => togglePreference(pref)}
                    className="sr-only peer"
                  />
                  <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-brandBlue transition-colors duration-300"></div>
                  <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-5"></div>
                </label>
              </div>
            ))}
          </div>

          <button
            onClick={savePreferences}
            className="mt-6 bg-brandBlue text-white px-6 py-2 rounded-md hover:bg-[#2DA7ED] transition"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
