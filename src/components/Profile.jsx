import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, LogOut, Edit3, Star } from "lucide-react";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
      setImagePreview(loggedInUser.profileImage || null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setUser({ ...user, profileImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!user) return alert("You must be signed in to save changes.");
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setEditMode(false);
    alert("✅ Profile updated successfully.");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4 text-sm text-gray-800">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-20 h-20">
            <img
              src={imagePreview || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border"
            />
            {user && (
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageUpload}
              />
            )}
          </div>
          <div>
            <h2 className="font-bold text-lg">{user?.name || "Your Name"}</h2>
            <p className="text-gray-500">{user?.email || "youremail@example.com"}</p>
          </div>
        </div>

        {/* General Info */}
        <div className="bg-white p-5 rounded shadow mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-brandBlue text-md">General Information</h3>
            {user ? (
              !editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="text-xs text-brandBlue flex items-center gap-1"
                >
                  <Edit3 size={14} /> Edit
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="text-xs text-green-600 font-semibold"
                >
                  Save
                </button>
              )
            ) : (
              <p className="text-red-500 text-xs">Sign in to edit</p>
            )}
          </div>

          <div className="space-y-3">
            {/* Mobile Number */}
            <div>
              <label className="font-medium">Mobile:</label>
              {editMode ? (
                <input
                  type="tel"
                  name="phone"
                  value={user.phone || ""}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full"
                />
              ) : (
                <p>{user?.phone || "Not added"}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="font-medium">Address:</label>
              {editMode ? (
                <input
                  type="text"
                  name="address"
                  value={user.address || ""}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full"
                />
              ) : (
                <p>{user?.address || "Not added"}</p>
              )}
            </div>

            {/* DOB */}
            <div>
              <label className="font-medium">Date of Birth:</label>
              {editMode ? (
                <input
                  type="date"
                  name="dob"
                  value={user.dob || ""}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full"
                />
              ) : (
                <p>{user?.dob || "Not added"}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="font-medium">Gender:</label>
              {editMode ? (
                <select
                  name="gender"
                  value={user.gender || ""}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full"
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                <p>{user?.gender || "Not specified"}</p>
              )}
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => navigate("/wallet")}
            className="flex justify-between items-center bg-white p-4 rounded shadow"
          >
            <span className="font-medium">My Wallet</span>
            <ArrowRight />
          </button>
          <button
            onClick={() => navigate("/my-coupons")}
            className="flex justify-between items-center bg-white p-4 rounded shadow"
          >
            <span className="font-medium">My Coupons</span>
            <ArrowRight />
          </button>
        </div>

        {/* Terms */}
        <div className="bg-white p-5 rounded shadow mb-6 text-sm">
          <h3 className="font-semibold text-brandBlue mb-2">Terms & Conditions</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Coins once added are <strong>non-refundable</strong>.</li>
            <li>1 Coin is equivalent to <strong>₹1</strong>.</li>
            <li>Coupons are <strong>non-returnable</strong> unless valid reasons are provided.</li>
            <li>
              For any issues or refunds, visit the{" "}
              <span
                className="text-brandBlue cursor-pointer underline"
                onClick={() => navigate("/query")}
              >
                Query
              </span>{" "}
              page.
            </li>
          </ul>
        </div>

        {/* User Rating */}
        <div className="bg-white p-4 rounded shadow flex flex-col gap-2 items-start mb-6">
          <span className="font-medium">Rate us</span>
          <div className="flex gap-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                onClick={() => setUserRating(i + 1)}
                fill={userRating > i ? "#facc15" : "none"}
                stroke="#facc15"
                className="cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Logout Button at Bottom */}
        <button
          onClick={handleLogout}
          className="flex justify-between items-center bg-red w-55 p-4 rounded shadow text-white-500"
        >
          <span className="font-medium">Logout</span>
          <LogOut />
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
