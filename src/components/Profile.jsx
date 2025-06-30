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

  // Load preferences from localStorage on mount
  useEffect(() => {
    const storedPrefs = JSON.parse(localStorage.getItem("preferences"));
    if (storedPrefs) {
      setPreferences(storedPrefs);
    }
  }, []);

  const togglePreference = (pref) => {
    setPreferences((prev) =>
      prev.includes(pref)
        ? prev.filter((p) => p !== pref)
        : [...prev, pref]
    );
  };

  const savePreferences = () => {
    localStorage.setItem("preferences", JSON.stringify(preferences));
    alert("Preferences saved!");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

        {/* Top Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold">Jessica Doe</h2>
              <p className="text-sm text-gray-500">jessica.couponqueen@email.com</p>
              <p className="text-xs text-gray-400">ID: 01291 • Wallet: ₹120.50</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 space-x-2">
            <button className="bg-brandBlue text-white text-sm px-4 py-2 rounded hover:bg-[#2DA7ED]">Edit Profile</button>
            <button className="border text-sm px-4 py-2 rounded text-gray-700">Add Funds</button>
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

          {/* Wallet */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Add Money to Wallet</h3>
            <input type="number" placeholder="Enter amount" className="w-full px-4 py-2 border rounded-md mb-4" />
            <button className="w-full bg-brandBlue text-white py-2 rounded hover:bg-[#2DA7ED]">Add Now</button>
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
